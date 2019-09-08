import getWeb3 from "./getWeb3";
createQuestion = async (contract, sender) => {
    // Get the value from the contract to prove it worked.
    await contract.methods.createQuestion().call({ from: sender }, (err, data) => {
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
                question: questions[questIndex][1],
                questionTypeHandler: questions[questIndex][2],
                questionTypeValueHandler: questions[questIndex][3]
            });
        }

        // Update state with the result.
        this.setState({ questions: result });
    });
}

export default getQuestions;