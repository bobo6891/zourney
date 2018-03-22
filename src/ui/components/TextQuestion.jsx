import React from 'react';
import Markdown from 'markdown'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextAnswer from './TextAnswer';

const markdown = Markdown.markdown;

const Wrapper = styled.div`
  display: block;
  padding: 16px;
  font-size: 1.2em;
`;

const Question = styled.div`
  display: block;
  border: 1px solid;
  padding: 16px;
`;

const Answers = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Buttons = styled.div`
  margin-top: 16px;
  text-align: center;
`;

class TextQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswered: null
    };
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  handleAnswerClick(e) {
    this.setState({
      correctAnswered: e.currentTarget.textContent === this.props.trueAnswer,
      userResponse: e.currentTarget.textContent
    });
  }

  render() {
    const { category, answers, solution, question, trueAnswer, handleNextClick } = this.props;
    const solutionHtml = {__html: markdown.toHTML(solution)};
    return (
      <Wrapper>
        <h5>{category}</h5>
        <Question>
          <div>
            <p>{question}</p>
          </div>
          <Answers>
            {answers.map(answer => (
              <TextAnswer
                trueAnswer={trueAnswer}
                handleAnswerClick={this.handleAnswerClick}
                key={answer}
                answer={answer}
                userResponse={this.state.userResponse}
              />
            ))}
          </Answers>
          {this.state.correctAnswered !== null && (
            <div>
              <p dangerouslySetInnerHTML={solutionHtml} />
            </div>
          )}
          {this.state.userResponse && (
            <Buttons>
              <button onClick={handleNextClick}>Next</button>
            </Buttons>
          )}
        </Question>
      </Wrapper>
    );
  }
}

TextQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  trueAnswer: PropTypes.string.isRequired,
  solution: PropTypes.string.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default TextQuestion;
