import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 24px 16px;
  position: relative;
  height: 100%;
  background-image: linear-gradient(135deg, rgba(191,191,191,1) 0%,rgba(63,63,63,1) 100%);
`;

const H2 = styled.h2`
  margin-bottom: 42px;
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;

const Button = styled.button`
  padding: 8px;
  width: 140px;
  background-color: rgb(255, 255, 255);
  border: none;
  box-shadow: 0px 2px 2px 0 rgba(67,67,67,0.7);
  border-radius: 50px;
  color: rgb(0, 0, 0);
  font-size: 1.2em;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  bottom: 0;
  right: 0;

  &:active {
    box-shadow: 0px 1px 1px 0 rgba(67,67,67,0.7);
  }
`;

class Welcome extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentWillReceiveProps({answer, trueAnswer, userResponse}) {
  //   let delayTransition = 500;
  //   if (userResponse === trueAnswer) {
  //     delayTransition = 0;
  //   }
  //   if (userResponse === answer && trueAnswer !== answer) {
  //     this.setState({className: 'wrong '});
  //     setTimeout(() => {
  //       this.setState({className: 'fadeOut animated'});
  //       setTimeout(() => {
  //         this.setState({display: false});
  //       }, 1000);
  //     }, delayTransition)
      
  //     return;
  //   }

  //   if (trueAnswer !== answer) {
  //     setTimeout(() => {
  //       this.setState({className: 'fadeOut animated'});
  //       setTimeout(() => {
  //         this.setState({display: false});
  //       }, 1000);
  //     }, delayTransition);
  //     return;
  //   }

  //   if (trueAnswer === answer) {
  //     this.setState({className: 'correct'});
  //   }
  // }

  render() {
    return (
      <Wrapper>
        <H2>
          Welcome User,
        </H2>
        <div>
          <p>
            This is the welcome page with placeholder text.
          </p>
          <p>
            If you’re looking for info and help to get set up in Berlin you’ve come to the right place.
          </p>
          <p>Just press play to start the app and get to learn everything that you need to know before your start date at Zalando.</p>
        </div>
        <Buttons>
          <Button onClick={this.handlePlayButton}>Play</Button>
        </Buttons>
      </Wrapper>
    );
  }
}

// Welcome.propTypes = {
//   answer: PropTypes.string.isRequired,
//   handleAnswerClick: PropTypes.func.isRequired,
//   trueAnswer: PropTypes.string.isRequired,
//   userResponse: PropTypes.string
// };

export default Welcome;