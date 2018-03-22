import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Answer = styled.div`
  display: block;
  padding: 16px;
  background-color: #e2e2e2;
  margin-top: 8px;
  margin-bottom: 8px;
  
  &:hover {
    background-color: #c4c4c4;
    cursor: pointer;
  }

  &.correct {
    background-color: rgb(219, 239, 220);
    color: rgb(40, 91, 42);


    &:hover {
      background-color: rgb(219, 239, 220);
      color: rgb(40, 91, 42);
      cursor: default;
    }
  }

  &.wrong {
    background-color: rgb(253, 217, 215);
    color: rgb(127, 35, 28);

    &:hover {
      background-color: rgb(253, 217, 215);
      color: rgb(127, 35, 28);
      cursor: default;
    }
  }

  &.fade-out {
    opacity: 0;
    transition: opacity 1s 1s ease;
  }
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
    const { handleAnswerClick, answer } = this.props;
    if (!this.state.display) {
      return null;
    }
    return (
      <Answer className={this.state.className} onClick={handleAnswerClick}>{answer}</Answer>
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