import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


// const Answer = styled.div`
//   display: block;
//   padding: 16px;
//   background-color: #e2e2e2;
//   margin-top: 8px;
//   margin-bottom: 8px;
  
//   &:hover {
//     background-color: #c4c4c4;
//     cursor: pointer;
//   }

//   &.correct {
//     background-color: rgb(219, 239, 220);
//     color: rgb(40, 91, 42);


//     &:hover {
//       background-color: rgb(219, 239, 220);
//       color: rgb(40, 91, 42);
//       cursor: default;
//     }
//   }

//   &.wrong {
//     background-color: rgb(253, 217, 215);
//     color: rgb(127, 35, 28);

//     &:hover {
//       background-color: rgb(253, 217, 215);
//       color: rgb(127, 35, 28);
//       cursor: default;
//     }
//   }

//   &.fade-out {
//     opacity: 0;
//     transition: opacity 1s 1s ease;
//   }
// `;

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Answer className={this.state.className} onClick={handleAnswerClick}>{answer}</Answer>
    );
  }
}

Menu.propTypes = {
  answer: PropTypes.string.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  trueAnswer: PropTypes.string.isRequired,
  userResponse: PropTypes.string
};

export default Menu;