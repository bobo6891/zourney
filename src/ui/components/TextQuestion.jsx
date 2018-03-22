import React from 'react';
import Markdown from 'markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextAnswer from './TextAnswer';

const { markdown } = Markdown;
const ABCD = ['A', 'B', 'C', 'D'];

const Wrapper = styled.div`
  display: block;
  padding: 16px;
  font-size: 1.2em;
`;

const Question = styled.div`padding: 28px 0;`;

const Answers = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
  flex-direction: column;
`;

const Buttons = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const Solution = styled.div`
  margin: 8px 0;
  font-size: 0.8em;
  border-radius: 4px;
  padding: 16px;
  color: #434343;
  background-color: #fff;
  box-shadow: 0 2px 2px 0px rgba(0,0,0,0.25);

  ul {
    padding-left: 16px;
  }
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
      correctAnswered: e.currentTarget.querySelector('.answer').textContent === this.props.trueAnswer,
      userResponse: e.currentTarget.querySelector('.answer').textContent
    });
  }

  render() {
    const { category, answers, solution, question, trueAnswer, handleNextClick } = this.props;
    const solutionHtml = { __html: markdown.toHTML(solution) };
    return (
      <Wrapper>
        <Question>
          <p>{question}</p>
        </Question>
        <Answers>
          {answers.map((answer, idx) => (
            <TextAnswer
              bullet={ABCD[idx]}
              trueAnswer={trueAnswer}
              handleAnswerClick={this.handleAnswerClick}
              key={answer}
              answer={answer}
              userResponse={this.state.userResponse}
            />
          ))}
        </Answers>
        {this.state.correctAnswered !== null && (
          <Solution>
            <p dangerouslySetInnerHTML={solutionHtml} />
          </Solution>
        )}
        {this.state.userResponse && (
          <Buttons>
            <button onClick={handleNextClick}>Next</button>
          </Buttons>
        )}
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
