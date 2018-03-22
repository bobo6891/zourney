import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const Wrapper = styled.div`
  color: rgb(255,255,255);
`;

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {categories} = this.props;
    return (
      <Wrapper>
        {categories.map(category => (
          <MenuItem key={category} category={category} />
        ))}
      </Wrapper>
    );
  }
}

Menu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Menu;