import React, { Component } from 'react';
import QuestionTemplate from '../QuestionTemplate/QuestionTemplate';
import Others from '../Others/ButtonAppBar';
class QuestionAdding extends Component {
    render() {
        return (
            <div>
                <Others></Others>
                <QuestionTemplate questions={this.props.questions} accountFrom={this.props.accountFrom} questionContract={this.props.questionContract}></QuestionTemplate>
            </div>
        )
    }
}
export default QuestionAdding;