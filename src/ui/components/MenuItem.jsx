import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Category = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  cursor: pointer;
  padding: 32px 12px;

  &.accommodation {
    background-color: #b582cd;
    .icon {
      background-image: url(/zourney/images/icons/ic_home_white_48px.svg);
    }
  }
  &.paperwork {
    background-color: #7bddaa;
    .icon {
      background-image: url(/zourney/images/icons/ic_description_white_48px.svg);
    }
  }
  &.lifestyle {
    background-color: #f3bd75;
    .icon {
      background-image: url(/zourney/images/icons/ic_favorite_white_48px.svg);
    }
  }
  &.zalando {
    background-color: #7fedee;
    .icon {
      background-size: 32px;
      background-image: url(/zourney/images/icons/zalando_white.png);
    }
  }
  &.places {
    background-color: #7d92bf;
    .icon {
      background-size: 28px;
      background-image: url(/zourney/images/icons/berlin_white.png);
    }
  }

  .icon {
    display: block;
    width: 56px;
    height: 56px;
    margin-right: 16px;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 50%;
    background-size: 38px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .text {
    p {
      margin: 0;
      font-size: 0.8em;
    }
  }

  ${props => props.screen === 'M_DEVICE' || props.screen === 'L_DEVICE' && `
    justify-content: center;
    font-size: 2em;

    &.zalando {
      .icon {
        background-size: 44px;
      }
    }
    &.places {
      background-color: #7d92bf;
      .icon {
        background-size: 44px;
      }
    }

    .icon {
      width: 82px;
      height: 82px;
      background-size: 54px;
    }
  `}
`;

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = {};
  }

  handleItemClick() {
    this.props.history.push(`./quiz/${this.props.category.toLowerCase()}`);
  }

  render() {
    const { category, screen } = this.props;
    return (
      <Category screen={screen} onClick={this.handleItemClick} className={category.toLowerCase()}>
        <div className="icon"/>
        <div className="text">
          <h3>{category}</h3>
          <p>2 / 10 Questions completed</p>
        </div>
      </Category>
    );
  }
}

MenuItem.propTypes = {
  category: PropTypes.string.isRequired
};

export default MenuItem;
