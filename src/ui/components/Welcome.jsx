import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #fff;
  background-image: url(/zourney/images/welcome_screen.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  padding: 24px 16px;
  position: relative;
  min-height: 100%;
  color: rgb(255, 255, 255);
  overflow: auto;

  .buttons {
    position: absolute;
    bottom: 24px;
    right: 24px;
    
    button {
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

      &:active {
        box-shadow: 0px 1px 1px 0 rgba(67,67,67,0.7);
      }
    }
  }

  ${props => props.screen === 'M_DEVICE' || props.screen === 'L_DEVICE' && `
    background-size: contain;
    .buttons {
      right: calc(50% - 70px);
    }
  `}
`;

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayButton = this.handlePlayButton.bind(this);
  }

  handlePlayButton() {
    this.props.history.push('./quiz/tutorial');
  }

  render() {
    return (
      <Wrapper screen={this.props.screen}>
        <div className="buttons">
          <button onClick={this.handlePlayButton}>Play</button>
        </div>
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
