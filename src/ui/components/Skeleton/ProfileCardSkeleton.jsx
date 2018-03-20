import React from 'react';
import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';

const animateSkeleton = keyframes`
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 140px;
  }
`;
const Skeleton = styled.ul`

  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding: 12px 24px;
    border-bottom: 1px solid rgb(207, 217, 219);

    &:last-child {
      border-bottom: none;
    }

    span {
      display: inline-block;

      &:first-child {
        width: 2em;
        margin-right: 18px;
      }
    }

    div {
      height: 16px;
      border-radius: 16px;

      &:first-of-type {
        background-image: linear-gradient(90deg, rgba(73,93,98,0.6) 0px, rgba(73,93,98,0.2) 40px, rgba(73,93,98,0.6) 80px);
        background-size: 400px;
        animation: ${animateSkeleton} 1.6s infinite linear;
        margin-bottom: 8px;
      }

      &:last-of-type {
        background-image: linear-gradient(90deg, rgba(73,93,98,0.4) 0px, rgba(73,93,98,0.2) 40px, rgba(73,93,98,0.4) 80px);
        background-size: 400px;
        animation: ${animateSkeleton} 1.6s infinite linear;
      }
    }
    &:nth-child(3n + 1) {
      div:first-of-type {
        width: 60px;
      }
      div:last-of-type {
        width: 50px;
      }
    }
    &:nth-child(3n + 2) {
      div:first-of-type {
        width: 50px;
      }
      div:last-of-type {
        width: 60px;
      }
    }
    &:nth-child(3n + 3) {
      div:first-of-type {
        width: 85px;
      }
      div:last-of-type {
        width: 75px;
      }
    }
  }
`;

const ProfileCardSkeleton = ({subInfo, icon, amount}) => {
  const items = [];
  for (let i = 0; i < amount; i++) { // eslint-disable-line no-plusplus
    items.push(
      <li key={i}>
        <span>
          {icon &&
            <span />
          }
        </span>
        <span>
          <div />
          {subInfo &&
            <div />
          }
        </span>
      </li>
    );
  }
  return (
    <Skeleton>
      {items}
    </Skeleton>
  );
};

ProfileCardSkeleton.defaultProps = {
  subInfo: true,
  icon: false,
  amount: 3
};

ProfileCardSkeleton.propTypes = {
  subInfo: PropTypes.bool,
  icon: PropTypes.bool,
  amount: PropTypes.number
};

export default ProfileCardSkeleton;
