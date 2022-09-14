import axios from 'axios';

export const getContents = async (date) => {
  let { data } = await axios.get('https://api.pulo.dev/v1/contents');

  return data.data.filter((item) => new Date(item.created_at) > date);
};

// module.exports = { getContents };
