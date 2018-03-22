import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 0;
  font-size: 0.8em;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 2px 0px rgba(0,0,0,0.25);
  margin: 8px 0;
  color: #434343;
  overflow: hidden;

  &:first-child {
    margin: 0 0 8px 0;
  }

  &:hover {
    .answer {
      background-color: #c4c4c4;
      cursor: pointer;
    }
  }

  &.correct {
    .answer {
      background-color: rgb(219, 239, 220);
      color: rgb(40, 91, 42);
    }
  }

  &.wrong {
    .answer {
      background-color: rgb(253, 217, 215);
      color: rgb(127, 35, 28);
    }
  }

  &.fade-out {
    opacity: 0;
    transition: opacity 1s 1s ease;
  }
`;

const Bullet = styled.div`
  padding: 16px;
  color: #b582cd;
  font-weight: 400;
`;

const Answer = styled.div`
  padding: 16px 16px 16px 8px;
  display: block;
  flex: 1;
`;

class TextAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: null,
      display: true
    };
  }

  componentWillReceiveProps({answer, trueAnswer, userResponse}) {
    let delayTransition = 500;
    if (userResponse === trueAnswer) {
      delayTransition = 0;
    }

    if (userResponse === answer && trueAnswer !== answer) {
      this.setState({className: 'wrong '});
      setTimeout(() => {
        this.setState({className: 'fadeOut animated'});
        setTimeout(() => {
          this.setState({display: false});
        }, 1000);
      }, delayTransition)
      
      return;
    }

    if (trueAnswer !== answer) {
      setTimeout(() => {
        this.setState({className: 'fadeOut animated'});
        setTimeout(() => {
          this.setState({display: false});
        }, 1000);
      }, delayTransition);
      return;
    }

    if (trueAnswer === answer) {
      this.setState({className: 'correct'});
    }
  }

  render() {
    const {bullet, handleAnswerClick, answer } = this.props;
    if (!this.state.display) {
      return null;
    }
    return (
      <Wrapper onClick={handleAnswerClick} className={this.state.className}>
        <Bullet>{bullet}</Bullet>
        <Answer className="answer">{answer}</Answer>
      </Wrapper>
    );
  }
}

TextAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  trueAnswer: PropTypes.string.isRequired,
  userResponse: PropTypes.string
};

export default TextAnswer;