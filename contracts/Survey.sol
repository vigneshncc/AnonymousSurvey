pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

/** @title Question contract */
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
        string quesID,
        string surveyID,
        string answer
    );

    struct SurveyData {
        string quesID;
        string surveyID;
        string answer;
    }
    
    struct QuestionData {
        string quesID;
        string quesName;
        string quesType;
        string quesTypeValue;
    }

    mapping(string => SurveyData) SurveyResults;
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
     * @param _quesID ID of the question
     * @param _surveyID ID of the survey
     * @param _answer Answer given by respondents
     * @return boolean value that represents whether survey submitted successfully or not
     */
    function submitSurvey(
        string memory _quesID,
        string memory _surveyID,
        string memory _answer
        ) public  returns (bool) {
        SurveyResults[_surveyID].quesID = _quesID;
        SurveyResults[_surveyID].surveyID = _surveyID;
        SurveyResults[_surveyID].answer = _answer;
        surveyCount++;
        surveyIDs.push(_surveyID);
        respondents.push(msg.sender);
        emit SurveySubmitted(_quesID, _surveyID, _answer);
        return true;
    }

    /**
     * @dev Used to get overall survey results
     * @return survey results
     */
    function getSurveyResults() public view returns (string[] memory, string[] memory,string[] memory)
    {
        string[] memory quesID = new string[](surveyCount);
        string[] memory surveyID = new string[](surveyCount);
        string[] memory answer = new string[](surveyCount);

        for (uint sIndex = 0; sIndex < surveyCount; sIndex++) {
            SurveyData storage sData = SurveyResults[surveyIDs[sIndex]];
            quesID[sIndex] = sData.quesID;
            surveyID[sIndex] = sData.surveyID;
            answer[sIndex] = sData.answer;
        }

        return (quesID, surveyID, answer);
    }
}