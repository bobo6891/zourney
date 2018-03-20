import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextAnswer from './TextAnswer';

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

// const Buttons = styled.div`
//   margin-top: 16px;
//   text-align: right;
// `;

class TextQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAnswerClick(e) {
    console.log('handleAnswerClick');
  }

  render() {
    const {category, answers, solution, question} = this.props;
    return (
      <Wrapper>
        <h5>{category}</h5>
        <Question>
          <div>
            <p>{question}</p>
          </div>
          <Answers>
            {answers.map(answer => (
              <TextAnswer handleAnswerClick={this.handleAnswerClick} key={answer} answer={answer} />
            ))}
          </Answers>
        </Question>
      </Wrapper>
    );
  }
}

TextQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  solution: PropTypes.string.isRequired,
};

export default TextQuestion;