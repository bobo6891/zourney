import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Answer = styled.div`
  display: block;
  width: calc(50% - 8px);
  padding: 16px;
  background-color: #e2e2e2;
  margin-top: 8px;
  margin-bottom: 8px;
  
  &:hover {
    background-color: #c4c4c4;
    cursor: pointer;
  }

  &:nth-child(2) {
    margin-left: 16px;
  }

  &:nth-child(3) {
    margin-right: 16px;
  }

  &.correct {
    background-color: rgb(219, 239, 220);;
    color: rgb(40, 91, 42);

    &:hover {
      background-color: rgb(219, 239, 220);;
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
`;

const TextAnswer = ({answer}) => {
  return (
    <Answer>{answer}</Answer>
  );
}

TextAnswer.propTypes = {
  answer: PropTypes.string.isRequired
};

export default TextAnswer;