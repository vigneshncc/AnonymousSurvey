const Question = artifacts.require("./Question.sol");
const Survey = artifacts.require("./Survey.sol");

const surveyStartTime = 1567900800; //Date and time (GMT): Sunday, 8 September 2019 00:00:00
const surveyEndTime = 1567987200; // Date and time (GMT): Monday, 9 September 2019 00:00:00

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Question, surveyStartTime, { from: accounts[0] });
  deployer.deploy(Survey, surveyStartTime, surveyEndTime, { from: accounts[0] });
};
