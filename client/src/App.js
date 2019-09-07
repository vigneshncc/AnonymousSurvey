import React, { Component } from "react";
import QuestionContract from "./contracts/Question.json";
import getWeb3 from "./utils/getWeb3";
import QuestionAdding from './QuestionAdding/QuestionAdding';
import { FormControl, InputLabel, Input, FormHelperText, Button, Container, Typography, CssBaseline } from '@material-ui/core';


import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = QuestionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        QuestionContract.abi,
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
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    //await contract.methods.createQuestion("quest_id1", "question name1", "question type1", "question type value1").send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getAllQuestions().call();
    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <Container >
            <QuestionAdding></QuestionAdding>
          </Container>
        </React.Fragment>
  
      </div>
    );
  }
}

export default App;
