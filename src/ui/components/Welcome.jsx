import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: url(/images/welcome_screen.jpg) no-repeat center center fixed;
  background-size: cover;
  padding: 24px 16px;
  position: relative;
  height: 100%;
  color: rgb(255, 255, 255);
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
  constructor(props) {
    super(props);

    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  handlePlayButton(e) {
    this.props.history.push('./menu');
  }

  render() {
    return (
      <Wrapper>
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