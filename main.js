var cheerio = require('cheerio');
const got = require('got');
const { slice } = require('cheerio/lib/api/traversing');
const getMagLink = require('./getTor.js')

async function getData(query, page = '1',callback) {
  let allTorrent = [];
  const url = `https://1337x.to/search/${query}/${page}/`;
  let htmlData;
  try {
    const res = await got(url);
    htmlData = res.body;

  } catch (er) {
    return null;
  }
  const $ = cheerio.load(htmlData);
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

let links=[];

    allTorrent.forEach((el,i)=>{
        links.push(el);
    });

    const torLinksA = await Promise.all(links.map(async({link,size,seed},i)=>{
      torLinks = await getMagLink(link,size,seed);
      return torLinks;
    }))

    callback(undefined,torLinksA);


}

// getData()

module.exports = getData;