pragma solidity 0.5.8;
pragma experimental ABIEncoderV2;

/** @title Survey contract */
contract Survey {

    address public surveyor;
    uint256 public surveyCount;
    string[] private surveyIDs;
    address[] private respondents;

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

    mapping (string => SurveyData) SurveyResults;

    constructor() public {
        surveyor = msg.sender;
        surveyCount = 0;
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
        require(bytes( respondents[msg.sender] ).length == 0, "Sender not authorized.");
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
    function submitSurvey(
        string memory _quesID,
        string memory _surveyID,
        string memory _answer
        ) public onlyValidRespondent  returns (bool) {
        Questions[_quesID].quesID = _quesID;
        Questions[_quesID].quesName = _quesName;
        Questions[_quesID].quesType = _quesType;
        Questions[_quesID].quesTypeValue = _quesTypeValue;
        questionLength++;
        respondents.push(_quesID);
        emit SurveySubmitted(_quesID, _quesName, _quesType, _quesTypeValue);
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

        for (uint i = 0; i < questionLength; i++) {
            QuestionData storage quesData = Questions[questionIDs[i]];
            quesID[i] = quesData.quesID;
            quesName[i] = quesData.quesName;
            quesType[i] = quesData.quesType;
            quesTypeValue[i] = quesData.quesTypeValue;
        }

        return (quesID, quesName, quesType, quesTypeValue);
    }
}