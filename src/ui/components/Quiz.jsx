import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {groupQuestionsByCategory} from '../utils/helper';
import TextQuestion from './TextQuestion';
import Header from './Header';

const tutorialQuestion = {
  category: 'Tutorial',
  question: 'Do you know how a Quizz Game works?',
  trueAnswer: 'yes',
  answers: ['yes','no'],
  solution: `And if you’re unsure we'll provide a helpful description for you... \n\nNow click "Continue" and enjoy!!`
};

const Wrapper = styled.div`
  display: block;
  height: 100%;
  overflow: auto;
  background-image: url(/zourney/images/background_accomodation.png);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  color: rgb(255,255,255);

  > .transparent {
    display: block;
    min-height: 100%;
    background-attachment: fixed;
    background-size: cover;
  }

  &.tutorial {
    background-image: url(/zourney/images/bgTutorialQuestion.jpeg);
    .transparent {
      background-image: linear-gradient(135deg, rgba(255,137,171,0.8) 0%,rgba(124,67,83,0.8) 100%);
    }
  }
  &.accommodation {
    .transparent {
      background-image: linear-gradient(135deg, rgba(181,130,205,0.8) 0%,rgba(58,43,66,0.8) 100%);
    }
  }
  &.paperwork {
    .transparent {
      background-image: linear-gradient(135deg, rgba(123,221,170,0.8) 0%,rgba(64,114,87,0.8) 100%);
    }
  }
  &.lifestyle {
    .transparent {
      background-image: linear-gradient(135deg, rgba(243,189,117,0.8) 0%,rgba(135,105,66,0.8) 100%);
    }
  }
  &.zalando {
    .transparent {
      background-image: linear-gradient(135deg, rgba(127,237,238,0.8) 0%,rgba(59,109,109,0.8) 100%);
    }
  }
  &.places {
    .transparent {
      background-image: linear-gradient(135deg, rgba(125,146,191,0.8) 0%,rgba(62,72,94,0.8) 100%);
    }
  }
`;

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleNextClick = this.handleNextClick.bind(this);
    const groupedQuestions = groupQuestionsByCategory(props.allQuestions);
    const quizCategory = props.match.params.category;
    if (props.match.params.category === 'tutorial') {
      this.state = {
        'tutorial': [tutorialQuestion],
        quizCategory: 'tutorial'
      }
    } else {
      this.state = groupedQuestions;
      this.state.quizCategory = quizCategory;
    }
  }

  handleNextClick() {
    const {quizCategory} = this.state;
    if (quizCategory === 'tutorial') {
      this.props.history.push('../menu');
      return;
    }
    const questions = this.state[quizCategory].slice(1)
    const newState = {};
    newState[quizCategory] = questions;
    this.setState(newState);
  }

  render() {
    const { screen, match } = this.props;
    const [item] = this.state[this.state.quizCategory];
    const categoryName = this.props.match.params.category;
    
    return (
      <Wrapper className={categoryName.toLowerCase()}>
        <div className="transparent">
          <Header screen={screen} history={this.props.history} categoryName={categoryName} />
          <TextQuestion categoryName={categoryName} screen={screen} history={this.props.history} match={match} handleNextClick={this.handleNextClick} {...item} />
        </div>
      </Wrapper>
    );
  }
}

// Quiz.propTypes = {
//   allQuestions: PropTypes.array.isRequired,
//   categories: PropTypes.array.isRequired
// };

export default Quiz;