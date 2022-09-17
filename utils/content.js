const axios = require('axios');

exports.getContents = async (date) => {
  let { data } = await axios.get('https://api.pulo.dev/v1/contents');

  const filteredContents = () => {
    let filteredContents = data.data.filter((item) => new Date(item.created_at) > new Date(date));
    return filteredContents.map(
      ({ title, owner, url, contributor, media }) =>
        `<a href="${url.trim()}"><b>${title.trim()}</b></a> | ${media.trim()} | ${
          owner === '' ? contributor.trim() : owner.trim()
        }`
    );
  };
  const randomContents = () => {
    const max = data.data.length;
    const total = 3;
    const getRandomInt = (max, total) => {
      let random = [];
      while (total--) {
        random.push(Math.floor(Math.random() * max));
      }
      return random;
    };

    let randomContent = ['<b>Konten developer acak hari ini:</b>'];
    getRandomInt(max, total).forEach((index) => {
      let currData = `<a href="${data.data[index].url.trim()}"><b>${data.data[
        index
      ].title.trim()}</b></a> | ${data.data[index].media.trim()} | ${
        data.data[index].owner === ''
          ? data.data[index].contributor.trim()
          : data.data[index].owner.trim()
      }`;
      randomContent.push(currData);
    });

    return randomContent;
  };
  return { filteredContents: filteredContents(), randomContents: randomContents() };
};
