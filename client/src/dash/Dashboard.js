import React, { Component, useState } from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button, Container, Typography, CssBaseline } from '@material-ui/core';
import SurveyContract from '../contracts/Survey.json';
import getWeb3 from "../utils/getWeb3";
import Dash from './Dash';
import Others from '../Others/ButtonAppBar';
const ethers = require('ethers');
class App extends Component {
    state = { questions: [], surveyResults: [], web3: null, accounts: null, contract: null };

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

            if (data == null)
                return [];
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

            // Update state with the result.
            this.setState({ questions: result });

        });

        // Get the value from the contract to prove it worked.
        await contract.methods.getSurveyResults().call({ from: accounts[0] }, (err, data) => {
            if (data == null)
                return [];

            const dataCount = Object.keys(data).length;
            if (dataCount === 0)
                return [];
            const surveyCount = data[Object.keys(data)[0]].length;
            var survey = [], result = [];
            var questMapping = {};
            this.state.questions.forEach(question => {
                questMapping[question.questionID] = {};
                questMapping[question.questionID]['questionID'] = question.questionID;
                questMapping[question.questionID]['questionTypeHandler'] = question.questionTypeHandler;
                questMapping[question.questionID]['question'] = question.question;
                questMapping[question.questionID]['questionTypeValueHandler'] = question.questionTypeValueHandler;
            });
            for (var sIndex = 0; sIndex < surveyCount; sIndex++) {
                survey[sIndex] = [];
                for (var dataIndex = 0; dataIndex < dataCount; dataIndex++) {
                    if (dataIndex === 0)
                        survey[sIndex][dataIndex] = data[Object.keys(data)[dataIndex]][sIndex];
                    else {
                        survey[sIndex][dataIndex] = ethers.utils.toUtf8String(data[Object.keys(data)[dataIndex]][sIndex]);
                    }
                }
                result.push({
                    surveyID: survey[sIndex][0],
                    questionID: survey[sIndex][1],
                    type: questMapping[survey[sIndex][1]]['questionTypeHandler'],
                    question: questMapping[survey[sIndex][1]]['question'],
                    answer: survey[sIndex][2]
                });
            }

            // Update state with the result.
            this.setState({ surveyResults: result });

        });
    };

    listenForEvents = () => {
        if (this.state.web3 && this.state.contracts) {

            this.state.contracts.SurveyContract.deployed().then(function (instance) {
                instance.QuestionCreated({}, {
                    fromBlock: App.currentBlockNumber,
                    toBlock: 'latest'
                }).watch(function (error, event) {
                    console.log("event triggered", event)
                    // Reload when a new question is recorded
                    App.render();
                });

            });
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
                        <Others></Others>
                        <Dash questions={this.state.questions} surveyResults={this.state.surveyResults} accountFrom={this.state.accounts[0]} contract={this.state.contract}></Dash>
                    </Container>
                </React.Fragment>

            </div>
        );
    }
}

export default App;