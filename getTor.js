const axios = require('axios');
const cheerio =require('cheerio');

async function getMagLink(url,size,seeds){
    let data={};
   // const url ='https://1337x.to/torrent/3907615/Avengers-Endgame-2019-1080p-HDRip-X264-AC3-EVO-TGx/'
   let htmld;
   try{
   htmld = await axios.get(url)
   }catch(err){
    // console.log(err);
   }

   const $ = cheerio.load(htmld.data);
   data.name = $('.box-info-heading').text().trim();
   data.magnet = $('.box-info ul li a').attr('href');
   data.seeds=seeds;
   data.size=size;

   return data;

  }
// getMagLink()
module.exports = getMagLink;

