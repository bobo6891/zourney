import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Category = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;

  padding: 32px 12px;

  &.accomodation {
    background-color: #b582cd;
  }
  &.paperwork {
    background-color: #7bddaa;
  }
  &.lifestyle {
    background-color: #f3bd75;
  }
  &.zalando {
    background-color: #7fedee;
  }
  &.places {
    background-color: #7d92bf;
  }
`;

const Icon = styled.div`
  display: block;
  width: 56px;
  height: 56px;
  margin-right: 16px;
  border: 2px solid rgb(255,255,255);
  border-radius: 50%;
  background-size: 48px 48px;
  background-repeat: no-repeat;
  background-position: center;
  &.accomodation {
    background-size: 38px;
    background-image: url(/images/icons/ic_home_white_48px.svg);
  }
  &.paperwork {
    background-size: 38px;
    background-image: url(/images/icons/ic_description_white_48px.svg);
  }
  &.lifestyle {
    background-size: 38px;
    background-image: url(/images/icons/ic_favorite_white_48px.svg);
  }
  &.zalando {
    background-size: 32px;
    background-image: url(/images/icons/zalando_white.png);
  }
  &.places {
    background-size: 28px;
    background-image: url(/images/icons/berlin_white.png);
  }
`;

const Text = styled.div`
  p {
    margin: 0;
    font-size: 0.8em;
  }
`;

class MenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {category } = this.props;
    return (
      <Category className={category.toLowerCase()}>
        <Icon className={category.toLowerCase()}></Icon>
        <Text>
          <h3>{category}</h3>
          <p>2 / 10 Questions completed</p>
        </Text>
      </Category>
    );
  }
}

MenuItem.propTypes = {
  category: PropTypes.string.isRequired
};

export default MenuItem;
