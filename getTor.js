const got = require('got')
var cheerio =require('cheerio');

async function getMagLink(url,size,seeds){
    let data={};
   // const url ='https://1337x.to/torrent/3907615/Avengers-Endgame-2019-1080p-HDRip-X264-AC3-EVO-TGx/'
   let datHtml;
   try{
   const htmld = await got(url)
  datHtml = htmld.body
   }catch(err){
    return null;
   }

   const $ = cheerio.load(datHtml);
   data.name = $('.box-info-heading').text().trim();
   data.magnet = $('.box-info ul li a').attr('href');
   data.seeds=seeds;
   data.size=size;

   return data;

  }
// getMagLink()
module.exports = getMagLink;

