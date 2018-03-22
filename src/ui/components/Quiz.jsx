import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {groupQuestionsByCategory} from '../utils/helper';
import TextQuestion from './TextQuestion';
import Header from './Header';

const Wrapper = styled.div`
  background-image: url(/images/background_accomodation.png);
  color: rgb(255,255,255);
`;

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleNextClick = this.handleNextClick.bind(this);
    const groupedQuestions = groupQuestionsByCategory(props.allQuestions);
    const quizCategory = props.history.location.pathname.split('/')[2];
    this.state = groupedQuestions;
    this.state.quizCategory = quizCategory;
  }

  handleNextClick(e) {
    const questions = this.state[this.state.quizCategory].slice(1)
    const newState = {};
    newState[this.state.quizCategory] = questions;
    this.setState(newState);
  }

  render() {
    const [item] = this.state[this.state.quizCategory];
    const categoryName = this.props.categories.find(category => (
      category.toLowerCase() === this.state.quizCategory
    ));

    return (
      <Wrapper>
        <Header categoryName={categoryName} />
        <TextQuestion history={this.props.history} handleNextClick={this.handleNextClick} {...item} />
      </Wrapper>
    );
  }
}

Quiz.propTypes = {
  allQuestions: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
};

export default Quiz;