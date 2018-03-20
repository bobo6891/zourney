import PropTypes from 'prop-types';

const profilePropType = PropTypes.shape({
  profile: PropTypes.shape({
    full_name: PropTypes.string,
    username: PropTypes.string
  }),
  clusters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      cost_centers: PropTypes.string,
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          owner: PropTypes.string,
          has_access: PropTypes.bool,
          role_url: PropTypes.string,
          member: PropTypes.arrayOf(PropTypes.string)
        })
      )
    })
  ),
  cost_centers: PropTypes.arrayOf(
    PropTypes.shape({
      team: PropTypes.string,
      cost_center: PropTypes.string
    })
  )
});

const profileActionPropType = PropTypes.shape({
  profileLoading: PropTypes.bool.isRequired,
  profile: profilePropType,
  error: PropTypes.object
});

export { profilePropType, profileActionPropType };

export default profilePropType;
