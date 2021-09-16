const express = require('express');
const app = express();
const port = process.env.PORT||3400;
const getData =require('./main.js')
const bodyParser = require('body-parser');
const getMagLink = require('./getTor.js');
const { data } = require('cheerio/lib/api/attributes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Hello");
})

app.get('/api/:query/:page?',async(req,res)=>{

    let query=req.params.query;
    let page=req.params.page;
    let data = await getData(query,page)
    let links=[]

    data.forEach((el,i)=>{
        links.push(el);
    })

    const torLinksA = await Promise.all(links.map(async({link,size,seed},i)=>{
      torLinks = await  getMagLink(link,size,seed);
      return torLinks;
    }))
    res.send(torLinksA)


})

app.listen(port,()=>{
    console.log(`Server is up..`);
})