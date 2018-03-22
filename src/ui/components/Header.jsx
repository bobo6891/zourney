import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgb(255,255,255);
  text-align: center;
  padding: 16px 0 8px;

  > .text {
    text-align: center;
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
`;

const Button = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  height: 48px;
  width: 48px;
  background-color: unset;
  border: unset;
  padding: 0;
  margin: 0;
  background-image: url(/images/icons/chevron-left.svg);
  background-repeat: no-repeat;
  background-size: 48px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = {};
  }

  handleBackButton() {
    this.props.history.push('/menu');
  }

  render() {
    const {categoryName} = this.props;
    return (
      <Wrapper>
        <Button onClick={this.handleBackButton} />
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