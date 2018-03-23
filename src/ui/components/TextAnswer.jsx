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
  max-height: 300px;
  background-color: #fff;
  box-shadow: 0 2px 2px 0px rgba(0,0,0,0.25);
  margin: 8px 0;
  color: #434343;
  overflow: hidden;
  transition-delay: 0s, 0s, 0.1s;
  transition-duration: 1s, 1s, 1s;
  transition-timing-function: ease-out, ease-out, ease-out;
  transition-property: opacity, max-height, margin;

  &.tutorial {
    > .bullet {
      color: #ff89ab;
    }
  }
  &.accommodation {
    > .bullet {
      color: #b582cd;
    }
  }
  &.paperwork {
    > .bullet {
      color: #7bddaa;
    }
  }
  &.lifestyle {
    > .bullet {
      color: #f3bd75;
    }
  }
  &.zalando {
    > .bullet {
      color: #7fedee;
    }
  }
  &.places {
    > .bullet {
      color: #7d92bf;
    }
  }

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
      background-color: #b5dd7a;
    }
  }

  &.wrong {
    .answer {
      background-color: #ff89ab;
    }
  }

  &.slide-out {
    max-height: 0px;
    margin: 0px;
  }

  &.fade-out {
    opacity: 0;
  }

  > .bullet {
    padding: 16px;
    color: #b582cd;
    font-weight: 400;
  }

  > .answer {
    padding: 16px 16px 16px 8px;
    display: block;
    flex: 1;
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
    let delayTransition = 750;
    if (userResponse === trueAnswer) {
      delayTransition = 0;
    }

    if (trueAnswer !== answer) {
      let className = '';
      if (userResponse === answer) {
        className = 'wrong'
        this.setState({className});
      }
      setTimeout(() => {
        className += ' slide-out fade-out';
        this.setState({className});
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
    const {category, screen, bullet, handleAnswerClick, answer } = this.props;
    if (!this.state.display) {
      return null;
    }
    return (
      <Wrapper screen={screen} onClick={handleAnswerClick} className={`${category} ${this.state.className}`}>
        <div className="bullet">{bullet}</div>
        <div className="answer">{answer}</div>
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