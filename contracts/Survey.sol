pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

/** @title Survey contract */
contract Survey {

    address private surveyor;
    uint256 private surveyCount;
    string[] private surveyIDs;
    address[] private respondents;
    uint256 private surveyStartTime;
    uint256 private surveyEndTime;


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

    mapping(string => SurveyData) SurveyResults;
    mapping(address => bool) isRespondentExists;

    constructor(
        uint256 _surveyStartTime,
        uint256 _surveyEndTime
     ) public {
        surveyor = msg.sender;
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
        require(!isRespondentExists[msg.sender], "Sender not authorized.");
        _;
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
        ) public onlyValidRespondent  returns (bool) {
        SurveyResults[_surveyID].quesID = _quesID;
        SurveyResults[_surveyID].surveyID = _surveyID;
        SurveyResults[_surveyID].answer = _answer;
        surveyCount++;
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