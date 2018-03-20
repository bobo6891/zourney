import PropTypes from 'prop-types';

const cardPropType = PropTypes.shape({
  header: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string
  }).isRequired,
  contentList: PropTypes.arrayOf(
    PropTypes.shape({
      info: PropTypes.string,
      subInfos: PropTypes.arrayOf(PropTypes.string),
      link: PropTypes.string,
      icon: PropTypes.string
    })
  ).isRequired,
  profileLoading: PropTypes.bool.isRequired,
  screen: PropTypes.string,
  category: PropTypes.string.isRequired
});

export default cardPropType;
