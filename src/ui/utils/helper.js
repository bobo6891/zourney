import { REQUEST_CLUSTER_URL } from '../../../settings';

export const objHasKey = Object.prototype.hasOwnProperty;

const ACCESS_ROLES = 'ACCESS_ROLES';
const REQUEST_ACCESS_ROLE = 'REQUEST_ACCESS_ROLE';
const REQUEST_CLUSTER = 'REQUEST_CLUSTER';

const getAccessRolesData = clusters => {
  const arr = [];
  clusters.forEach(cluster => {
    cluster.roles.forEach(clusterRole => {
      if (clusterRole.has_access) {
        arr.push({
          info: cluster.name,
          subInfos: [clusterRole.id],
          hash: Math.random().toString(36)
        });
      }
    });
  });
  if (!arr.length) {
    return [
      {
        info: "You don't have access to any cluster.",
        hash: Math.random().toString(36)
      }
    ];
  }
  return arr;
};

const getRequestAccessRolesData = clusters => {
  const arr = [];
  clusters.forEach(cluster => {
    cluster.roles.forEach(clusterRole => {
      if (!clusterRole.has_access) {
        arr.push({
          info: cluster.name,
          subInfos: [clusterRole.id],
          link: clusterRole.role_url,
          icon: 'mdi-arrow-right',
          hash: Math.random().toString(36)
        });
      }
    });
  });
  if (!arr.length) {
    return [
      {
        info: 'No clusters found',
        hash: Math.random().toString(36)
      }
    ];
  }
  return arr;
};

const getRequestClusterData = costCenters => {
  if (!costCenters.length) {
    return [
      {
        info: 'Your account does not belong to any cost center.',
        hash: Math.random().toString(36)
      }
    ];
  }

  const hashMap = costCenters.reduce((acc, costCenter) => {
    if (!acc[costCenter.cost_center]) {
      acc[costCenter.cost_center] = {
        info: costCenter.cost_center,
        subInfos: [],
        link: REQUEST_CLUSTER_URL,
        icon: 'mdi-arrow-right',
        hash: Math.random().toString(36)
      };
    }

    if (costCenter.source.type === 'user' && acc[costCenter.cost_center]) {
      acc[costCenter.cost_center].subInfos = [];
    } else {
      acc[costCenter.cost_center].subInfos.push(costCenter.source.name);
    }
    return acc;
  }, {});

  return Object.keys(hashMap).map(k => hashMap[k]);
};

const getHeader = category => {
  let header = {};
  switch (category) {
    case ACCESS_ROLES:
      header = {
        title: 'Your clusters',
        subTitle: 'You have access to the following clusters via Zack',
        color: 'rgb(106, 168, 79)',
        icon: 'mdi-account'
      };
      break;
    case REQUEST_ACCESS_ROLE:
      header = {
        title: 'Request Cluster Access',
        subTitle: "Request access to your team's clusters via Zack",
        color: 'rgb(89, 126, 170)',
        icon: 'mdi-account-multiple'
      };
      break;
    case REQUEST_CLUSTER:
      header = {
        title: 'Request New Clusters',
        subTitle: 'Request clusters for your cost center',
        color: 'rgb(255, 217, 102)',
        icon: 'mdi-loupe'
      };
      break;
    default:
      break;
  }

  return header;
};

const getContentList = (profile, category) => {
  let contentList = [];
  if (!profile) {
    return contentList;
  }
  switch (category) {
    case ACCESS_ROLES:
      contentList = getAccessRolesData(profile.clusters);
      break;
    case REQUEST_ACCESS_ROLE:
      contentList = getRequestAccessRolesData(profile.clusters);
      break;
    case REQUEST_CLUSTER:
      contentList = getRequestClusterData(profile.cost_centers);
      break;
    default:
      break;
  }
  return contentList;
};

const getCardsData = (category, profile) => {
  const contentList = !profile ? [] : getContentList(profile, category);
  return {
    header: getHeader(category),
    contentList,
    category
  };
};

export { getCardsData, ACCESS_ROLES, REQUEST_ACCESS_ROLE, REQUEST_CLUSTER };
