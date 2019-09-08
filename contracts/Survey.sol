pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

/** @title Survey contract */
contract Survey {

    address private surveyor;
    uint256 private surveyCount;
    string[] private surveyIDs;
    address[] private respondents;
    uint256 private questionLength;
    string[] private questionIDs;
    uint256 private surveyStartTime;
    uint256 private surveyEndTime;

    event QuestionCreated(
        string quesID,
        string quesName,
        string quesType,
        string quesTypeValue
    );
    event SurveySubmitted(
        string surveyID,
        bytes[] quesID,
        bytes[] answer
    );

    struct SurveyData {
        string surveyID;
        bytes quesID;
        bytes answer;
    }
    
    struct QuestionData {
        string quesID;
        string quesName;
        string quesType;
        string quesTypeValue;
    }

    mapping(uint256 => SurveyData) SurveyResults;
    mapping(address => bool) isRespondentExists;
    mapping (string => QuestionData) Questions;

    constructor(
        uint256 _surveyStartTime, uint256 _surveyEndTime
        ) public {
        surveyor = msg.sender;
        questionLength = 0;
        surveyCount = 0;
        surveyStartTime = _surveyStartTime;
        surveyEndTime = _surveyEndTime;
    }
    
    /**
     * @dev Modifier which checks if sender is equal to surveyor.
     */
    modifier onlySurveyor() {
        require(surveyor == msg.sender, "Sender not authorized.");
        _;
    }

    /**
     * @dev Modifier which checks if respondent is already completed survey or not.
     */
    modifier onlyValidRespondent() {
        require((!isRespondentExists[msg.sender] && (surveyor != msg.sender)), "Sender not authorized.");
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
    function getAllQuestions() public view returns (string[] memory, string[] memory,string[] memory,string[] memory) {
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

    /**
     * @dev Saves the submitted survey data from respondents
     * @param _quesIDs ID of the question
     * @param _surveyID ID of the survey
     * @param _answers Answer given by respondents
     * @return boolean value that represents whether survey submitted successfully or not
     */
    function submitSurvey(
        string memory _surveyID,
        bytes[] memory  _quesIDs,
        bytes[] memory _answers
        ) public  returns (bool) {
        for (uint sIndex = 0; sIndex < _quesIDs.length; sIndex++) {
            SurveyResults[surveyCount].surveyID = _surveyID;
            SurveyResults[surveyCount].quesID = _quesIDs[sIndex];
            SurveyResults[surveyCount].answer = _answers[sIndex];
            surveyCount++;
        }
        surveyIDs.push(_surveyID);
        respondents.push(msg.sender);
        emit SurveySubmitted(_surveyID, _quesIDs, _answers);
        return true;
    }

    /**
     * @dev Used to get overall survey results
     * @return survey results
     */
    function getSurveyResults() public view returns (string[] memory, bytes[] memory, bytes[] memory)
    {
        string[] memory surveyID = new string[](surveyCount);
        bytes[] memory quesID = new bytes[](surveyCount);
        bytes[] memory answer = new bytes[](surveyCount);

        for (uint sIndex = 0; sIndex < surveyCount; sIndex++) {
            SurveyData storage sData = SurveyResults[sIndex];
            quesID[sIndex] = sData.quesID;
            surveyID[sIndex] = sData.surveyID;
            answer[sIndex] = sData.answer;
        }

        return (surveyID, quesID, answer);
    }
}