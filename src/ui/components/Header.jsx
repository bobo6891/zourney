import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;

  background-color: rgb(255,255,255);
  text-align: center;
  padding: 16px 16px 8px;

  h6 {
    font-weight: 300;
    color: #434343;
  }

  p {
    margin: 0;
    font-size: 0.8em;
    color: #b582cd;
  }
`;

const Button = styled.button`
  background-image: url(/images/icons/ic_chevron_left_black_48px.svg);
  background-repeat: no-repeat;
  background-size: 48px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {categoryName} = this.props;
    return (
      <Wrapper>
        <div>
          <Button></Button>
        </div>
        <div>
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