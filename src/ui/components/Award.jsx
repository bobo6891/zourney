import React from 'react';
import styled from 'styled-components';
import Confetti from '../utils/confetti';

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  background-size: contain;
  background-attachment: fixed;
  background-repeat: no-repeat;

  &.tutorial {
    background-image: url(/zourney/images/rewardTutorial.png);
  }

  &.accommodation {
    background-image: url(/zourney/images/rewardAccommodation.png);
  }
  
  > .buttons {
    margin-top: 16px;
    text-align: center;

    button {
      position: fixed;
      bottom: 0;
      left: 0;
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

  #confetti {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

class Award extends React.Component {
  constructor(props) {
    super(props);

    this.handleMenuButton = this.handleMenuButton.bind(this);
  }

  componentDidMount() {
    this.confetti = new Confetti.Context(this.confetti);
    this.confetti.start();
  }

  handleMenuButton() {
    this.props.history.push('../menu');
  }

  render() {
    const {category} = this.props;
    return (
      <Wrapper className={category} screen={this.props.screen}>
        <canvas ref={(confetti) => this.confetti = confetti} height="100%" width="100%" id="confetti" />
        <div className="buttons">
          <button onClick={this.handleMenuButton}>Menu</button>
        </div>
      </Wrapper>
    );
  }
}


export default Award;
