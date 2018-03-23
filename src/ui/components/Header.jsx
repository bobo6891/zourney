import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgb(255, 255, 255);
  text-align: center;
  padding: 16px 0 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;

  > button {
    position: relative;
    height: 48px;
    width: 48px;
    background-color: unset;
    border: unset;
    padding: 0;
    margin: 0;
    background-image: url(/zourney/images/icons/chevron-left.svg);
    background-repeat: no-repeat;
    background-size: 48px;
  }

  &.tutoria; {
    > .text {
      p {
        color: #ff89ab;
      }
    }
  }
  &.accommodation {
    > .text {
      p {
        color: #b582cd;
      }
    }
  }
  &.paperwork {
    > .text {
      p {
        color: #7bddaa;
      }
    }
  }
  &.lifestyle {
    > .text {
      p {
        color: #f3bd75;
      }
    }
  }
  &.zalando {
    > .text {
      p {
        color: #7fedee;
      }
    }
  }
  &.places {
    > .text {
      p {
        color: #7d92bf;
      }
    }
  }

  > .text {
    text-align: center;
    display: block;
    flex: 1;
    margin-left: -48px;
    h6 {
      font-weight: 300;
      color: #434343;
    }

    p {
      margin: 0;
      font-size: 0.8em;
      color: #b582cd;
    }
  }

  ${props => props.screen === 'M_DEVICE' || props.screen === 'L_DEVICE' && `
    font-size: 2em;
  `}
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = {};
  }

  handleBackButton() {
    this.props.history.push('../menu');
  }

  render() {
    const { screen, categoryName } = this.props;
    return (
      <Wrapper className={categoryName.toLowerCase()}screen={screen}>
        <button onClick={this.handleBackButton} />
        <div className="text">
          <h6>{categoryName} trivia</h6>
          <p>Question 4</p>
        </div>
      </Wrapper>
    );
  }
}

Header.propTypes = {
  categoryName: PropTypes.string.isRequired
};

export default Header;
