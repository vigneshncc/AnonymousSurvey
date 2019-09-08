import React, { Component, useState } from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button, Container, Typography, CssBaseline } from '@material-ui/core';
import SurveyContract from "./contracts/Survey.json";
import getWeb3 from "./utils/getWeb3";
import QuestionAdding from './QuestionAdding/QuestionAdding';
import "./App.css";

class App extends Component {
  state = { questions: [], web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SurveyContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SurveyContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    this.listenForEvents();
  };

  runExample = async () => {
    
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    //await contract.methods.createQuestion("quest_id1", "question name1", "question type1", "question type value1").send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    await contract.methods.getAllQuestions().call({ from: accounts[0] }, (err, data) => {

      console.log("data", data);
      const dataCount = Object.keys(data).length;
      if (dataCount === 0)
        return [];
      const questCount = data[Object.keys(data)[0]].length;
      var questions = [], result = [];
      for (var questIndex = 0; questIndex < questCount; questIndex++) {
        questions[questIndex] = [];
        for (var dataIndex = 0; dataIndex < dataCount; dataIndex++) {
          questions[questIndex][dataIndex] = data[Object.keys(data)[dataIndex]][questIndex];
        }

        
        result.push({
          questionID: questions[questIndex][0],
          question: questions[questIndex][1],
          questionTypeHandler: questions[questIndex][2],
          questionTypeValueHandler: questions[questIndex][3]
      });
      }

      console.log("result", result);

    // Update state with the result.
    this.setState({ questions: result });

    });
  };

  listenForEvents =  () => {
    if(this.state.web3 && this.state.contracts){

      this.state.contracts.SurveyContract.events.allEvents({ fromBlock:'latest' }, function(error, result) {
          console.log("error", error);
          console.log("result", result)
      });

      // this.state.contracts.SurveyContract.deployed().then(function (instance) {
      //   instance.QuestionCreated({}, {
      //     fromBlock: App.currentBlockNumber,
      //     toBlock: 'latest'
      //   }).watch(function (error, event) {
      //     console.log("event triggered", event)
      //     // Reload when a new question is recorded
      //     App.render();
      //   });
  
      // });
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Connecting blockchain...</div>;
    }
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Container >
            <QuestionAdding questions={this.state.questions} accountFrom={this.state.accounts[0]} contract={this.state.contract}></QuestionAdding>
          </Container>
        </React.Fragment>

      </div>
    );
  }
}

export default App;
