const axios = require('axios');
const cheerio = require('cheerio');
const { slice } = require('cheerio/lib/api/traversing');
const getMagLink = require('./getTor.js')

async function getData(query = '', page = '1') {
  let allTorrent = [];
  const url = `https://1337x.to/search/${query}/${page}/`;
  let htmlData;
  try {
    htmlData = await axios.get(url)
  } catch (er) {
    console.log(er);
  }
  const $ = cheerio.load(htmlData.data);
  const tbody = $('tbody tr');

  for (let i = 0; i < tbody.length; i++) {
    const name = $(tbody[i]).find('td.name').text().trim().slice(0, -2);
    const seeds = $(tbody[i]).find('td.seeds').text().trim();
    const size = $(tbody[i]).find('td.size').text().trim().slice(0, -5);
    const link = 'https://1337x.to' + $(tbody[i]).find('td.name a').next().attr('href');

    allTorrent.push(
      {
        name: name,
        seed: seeds,
        size: size,
        link: link
      });

     getMagLink(link,seeds,size);

  }

  // const torrents = {
  //   allTorrent,
  // }

return allTorrent;

}

module.exports = getData;