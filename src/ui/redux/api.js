import DATA_JSON from '../data/data.json';

const fetchData = () => {
  return new Promise((resolve) => {
    resolve(DATA_JSON.slice());
  }); 
};

export { fetchData };

export default fetchData;
