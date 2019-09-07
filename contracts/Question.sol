pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

/** @title Question contract */
contract Question {

    address public surveyor;
    uint256 public questionLength;
    string[] private questionIDs;
    uint256 private surveyStartTime;

    event QuestionCreated(
        string quesID,
        string quesName,
        string quesType,
        string quesTypeValue
    );

    struct QuestionData {
        string quesID;
        string quesName;
        string quesType;
        string quesTypeValue;
    }

    mapping (string => QuestionData) Questions;

    constructor(
        uint256 _surveyStartTime
        ) public {
        surveyor = msg.sender;
        surveyStartTime = _surveyStartTime;
        questionLength = 0;
    }
    
    /**
     * @dev Modifier which checks if sender is equal to surveyor.
     */
    modifier onlySurveyor() {
        require(surveyor == msg.sender, "Sender not authorized.");
        _;
    }

    /**
     * @dev Sets all data for question
     * @param _quesID ID of the question
     * @param _quesName Name of the question
     * @param _quesType Type of the question
     * @param _quesTypeValue Amount of cash available
     * @return boolean value that represents whether question created successfully or not
     */
    function createQuestion(
        string memory _quesID,
        string memory _quesName,
        string memory _quesType,
        string memory _quesTypeValue
        ) public onlySurveyor  returns (bool) {
        Questions[_quesID].quesID = _quesID;
        Questions[_quesID].quesName = _quesName;
        Questions[_quesID].quesType = _quesType;
        Questions[_quesID].quesTypeValue = _quesTypeValue;
        questionLength++;
        questionIDs.push(_quesID);
        emit QuestionCreated(_quesID, _quesName, _quesType, _quesTypeValue);
        return true;
    }

    /**
     * @dev Gets all data for Questions
     * @return Questions created
     */
    function getAllQuestions() public view returns (string[] memory, string[] memory,string[] memory,string[] memory)
    {
        string[] memory quesID = new string[](questionLength);
        string[] memory quesName = new string[](questionLength);
        string[] memory quesType = new string[](questionLength);
        string[] memory quesTypeValue = new string[](questionLength);

        for (uint256 qIndex = 0; qIndex < questionLength; qIndex++) {
            QuestionData storage quesData = Questions[questionIDs[qIndex]];
            quesID[qIndex] = quesData.quesID;
            quesName[qIndex] = quesData.quesName;
            quesType[qIndex] = quesData.quesType;
            quesTypeValue[qIndex] = quesData.quesTypeValue;
        }

        return (quesID, quesName, quesType, quesTypeValue);
    }
}