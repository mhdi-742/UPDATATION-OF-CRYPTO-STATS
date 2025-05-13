import express from 'express';
import { mongoose } from 'mongoose';
import cors from 'cors'
import routes from './routes/routes.js';
import { connect, StringCodec } from "nats";
import CoinData from './models/CoinData.js';
const apiserver=express();
const url="mongodb://localhost:27017/koinx";
mongoose.connect(url)
.then((res)=>console.log("connected to DB"))
.catch((err)=>console.log(err));
apiserver.use(cors({
  origin : true,
  credentials : true
}));    
apiserver.use(express.json());
apiserver.listen(8000,()=>{
console.log("connected");
});
apiserver.use(routes);


const storeCryptoStats =async()=>{
    console.log("this is a function");
    const url = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=bitcoin%2Cethereum%2Cmatic-network&include_market_cap=true&include_24hr_change=true';
    const options = {
    method: 'GET',
   headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-gYpaeTdQ6x1Zx6wkGiBMkcn7'}
};
 let result= await fetch(url, options);
 result=await result.json();
 
 
 let data=await CoinData.find({});
 if(!data.length)
 {
    const bit_price=[result.bitcoin.usd];
    const bit_marketcap=[result.bitcoin.usd_market_cap];
    const bit_change=[result.bitcoin.usd_24h_change];
    const eth_price=[result.ethereum.usd];
    const eth_marketcap=[result.ethereum.usd_market_cap];
    const eth_change=[result.ethereum.usd_24h_change];
    const matic_price=[result['matic-network'].usd];
     const matic_marketcap=[result['matic-network'].usd_market_cap];
    const matic_change=[result['matic-network'].usd_24h_change];
    const create=await CoinData.create({
        bitcoin:{
            currentprice:bit_price,
            marketcap:bit_marketcap,
            dailychange:bit_change
        },
        ethereum:{
             currentprice:eth_price,
            marketcap:eth_marketcap,
            dailychange:eth_change
        },
        matic_network:{
           currentprice:matic_price,
            marketcap:matic_marketcap,
            dailychange:matic_change
        }
    })
    console.log(create);
 }
 else {
   if(data[0].bitcoin.currentprice.length>101)
    {
     data[0].bitcoin.currentprice.shift();
     data[0].bitcoin.marketcap.shift();
     data[0].bitcoin.dailychange.shift();
     data[0].ethereum.currentprice.shift();
     data[0].ethereum.marketcap.shift();
     data[0].ethereum.dailychange.shift();
     data[0].matic_network.currentprice.shift();
     data[0].matic_network.marketcap.shift();
     data[0].matic_network.dailychange.shift();
    } 
   data[0].bitcoin.currentprice.push(result.bitcoin.usd);
   data[0].bitcoin.marketcap.push(result.bitcoin.usd_market_cap);
   data[0].bitcoin.dailychange.push(result.bitcoin.usd_24h_change);
   data[0].ethereum.currentprice.push(result.ethereum.usd);
   data[0].ethereum.marketcap.push(result.ethereum.usd_market_cap);
   data[0].ethereum.dailychange.push(result.ethereum.usd_24h_change);
   data[0].matic_network.currentprice.push(result['matic-network'].usd);
   data[0].matic_network.marketcap.push(result['matic-network'].usd_market_cap);
   data[0].matic_network.dailychange.push(result['matic-network'].usd_24h_change);
   const updatedata=await CoinData.updateMany({},{$set:data[0]});
   console.log(updatedata);
 }

}

const main=async()=>{
    const nc=await connect ({
        servers:[
            "localhost:4222"
        ]
    })
    console.log("Connected");
    const sc=StringCodec();
    const sub=nc.subscribe("pub");
    for await (const m of sub) {
        const data=JSON.parse(sc.decode(m.data));
        if(data.trigger==="update")
        {
            storeCryptoStats();
        }
  }
  console.log("subscription closed");
}
main();