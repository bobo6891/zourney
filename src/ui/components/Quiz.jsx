import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {groupQuestionsByCategory} from '../utils/helper';
import TextQuestion from './TextQuestion';
import Header from './Header';

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
    background-image: linear-gradient(135deg, rgba(181,130,205,0.8) 0%,rgba(58,43,66,0.8) 100%);;
    background-attachment: fixed;
    background-size: cover;
  }
`;

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleNextClick = this.handleNextClick.bind(this);
    const groupedQuestions = groupQuestionsByCategory(props.allQuestions);
    const quizCategory = props.match.params.category;
    this.state = groupedQuestions;
    this.state.quizCategory = quizCategory;
  }

  handleNextClick() {
    const questions = this.state[this.state.quizCategory].slice(1)
    const newState = {};
    newState[this.state.quizCategory] = questions;
    this.setState(newState);
  }

  render() {
    const { screen } = this.props;
    const [item] = this.state[this.state.quizCategory];
    const categoryName = this.props.categories.find(category => (
      category.toLowerCase() === this.state.quizCategory
    ));

    return (
      <Wrapper>
        <div className="transparent">
          <Header screen={screen} history={this.props.history} categoryName={categoryName} />
          <TextQuestion screen={screen} history={this.props.history} handleNextClick={this.handleNextClick} {...item} />
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