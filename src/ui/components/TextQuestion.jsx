import React from 'react';
import Markdown from 'markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextAnswer from './TextAnswer';

const { markdown } = Markdown;
const ABCD = ['A', 'B', 'C', 'D'];

const Wrapper = styled.div`
  display: block;
  padding: 16px 0 0;
  font-size: 1.2em;

  &.tutorial {
    > .to-continue {
      color: #ff89ab;
    }
    > .buttons {
      button {
        background-color: #ff89ab;
      }
    }
    .tutorial-images {
      position: relative;
      transition: height 1s ease;
      height: 0px;
      overflow: hidden;
      span {
        position: absolute;
        transition: opacity 1s ease;
        background-repeat: no-repeat;
        display: inline-block;
        height: 78px;
        background-repeat: no-repeat;
        width: 187px;
        opacity: 0;
      }
      .image-1 {
        top: -90px;
        right: 30px;
        background-image: url(/zourney/images/Tutorial01.png);
      }
      .image-2 {
        top: 0;
        left: 16px;
        background-image: url(/zourney/images/Tutorial02.png);
      }
    }
  }
  &.accommodation {
    > .to-continue {
      color: #b582cd;
    }
    > .buttons {
      button {
        background-color: #b582cd;
      }
    }
  }
  &.paperwork {
    > .to-continue {
      color: #7bddaa;
    }
    > .buttons {
      button {
        background-color: #7bddaa;
      }
    }
  }
  &.lifestyle {
    > .to-continue {
      color: #f3bd75;
    }
    > .buttons {
      button {
        background-color: #f3bd75;
      }
    }
  }
  &.zalando {
    > .to-continue {
      color: #7fedee;
    }
    > .buttons {
      button {
        background-color: #7fedee;
      }
    }
  }
  &.places {
    > .to-continue {
      color: #7d92bf;
    }
    > .buttons {
      button {
        background-color: #7d92bf;
      }
    }
  }

  > .question {
    padding: 28px 16px;
  }

  > .answers {
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: column;
  }

  > .solution {
    padding: 0 16px;
    margin: 8px 0;
    font-size: 0.8em;
    color: #434343;

    .solution-card {
      border-radius: 4px;
      padding: 16px;
      background-color: #fff;
      box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.25);

      > *:last-child {
        margin-bottom: 0;
      }

      ul {
        padding-left: 16px;
      }
    }
  }

  > .buttons {
    margin-top: 16px;
    text-align: center;

    button {
      color: #fff;
      text-shadow: 0 0 4px rgba(0,0,0,0.8);
      font-weight: 600;
      font-size: 1.2em;
      text-transform: uppercase;
      width: 100%;
      border: unset;
      margin: unset;
      background-color: #b582cd;
      padding: 4px 16px;
    }
  }

  > .to-continue {
    font-size: 0.8em;
    padding: 0 16px;
    position: relative;
    text-align: center;
    padding: 8px 0;
    color: #b582cd;
  }

  ${props => props.displayTutorial && `
    &.tutorial {
      .tutorial-images {
        height: 72px;
        overflow: visible;

        span {
          opacity: 1;
        }
      }
    }
  `};

  ${props => props.screen === 'M_DEVICE' || props.screen === 'L_DEVICE' && `
    font-size: 2.4em;

    > .solution {
      .solution-card {
        ul {
          padding-left: 32px;
        }
      }
    }
  `};
`;

class TextQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswered: null
    };
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question !== this.props.question) {
      this.setState({
        userResponse: null,
        correctAnswered: null
      });
    }
  }

  handleAnswerClick(e) {
    const userResponse = e.currentTarget.querySelector('.answer').textContent;
    this.setState({
      correctAnswered: userResponse === this.props.trueAnswer,
      userResponse
    });
  }

  render() {
    const { categoryName, screen, answers, solution, question, trueAnswer, handleNextClick } = this.props;
    const solutionHtml = { __html: markdown.toHTML(solution) };
    const displayTutorial = categoryName.toLowerCase() === 'tutorial' && this.state.userResponse;

    return (
      <Wrapper displayTutorial={displayTutorial} className={categoryName.toLowerCase()} screen={screen}>
        <div className="question">
          <p>{question}</p>
        </div>
        <div className="tutorial-images">
          <span className="image-1" />
          <span className="image-2" />
        </div>
        <div className="answers">
          {answers.map((answer, idx) => (
            <TextAnswer
              category={categoryName.toLowerCase()}
              screen={screen}
              bullet={ABCD[idx]}
              trueAnswer={trueAnswer}
              handleAnswerClick={this.handleAnswerClick}
              key={answer}
              answer={answer}
              userResponse={this.state.userResponse}
            />
          ))}
        </div>
        {this.state.correctAnswered !== null && (
          <div className="solution">
            <div className="solution-card" dangerouslySetInnerHTML={solutionHtml}/>
          </div>
        )}
        {this.state.userResponse ? (
          <div className="buttons">
            <button onClick={handleNextClick}>{this.props.match.params.category === 'tutorial' ? 'Continue' : 'Play next'}</button>
          </div>
        ) : (
          <div className="to-continue">Select an answer to continue</div>
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
