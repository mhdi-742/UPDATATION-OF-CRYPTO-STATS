import express from 'express';

const router=express();
router.use(express.json())

const getStandardDeviation= (array)=> {
 let mean=0.0;
 let sum=0.0;
 let count=100;
 for(let i=array.length-1;i>=0 && count>0;i--)
 {
    sum+=array[i];
    count--;
 }
 let n=Math.min(100,array.length);
 mean=sum/n;
 let ans=0.0;
 count=100;
 for(let i=array.length-1;i>=0 && count>0;i--)
 {
   ans+=(array[i]-mean)*(array[i]-mean);
   count--;
 }
 ans=ans/(n-1);
 return ans;
}

router.get('/',async(req,res)=>{
    res.send("hello");
})


router.get('/stats',async(req,res)=>{

    const query=req.body.coin;
     let data=await CoinData.find({});
     if(!data.length)
     {
        return res.send("Wait");
     }
     if(query==="bitcoin")
     {
        const ans={
           price: data[0].bitcoin.currentprice[data[0].bitcoin.currentprice.length-1],
	       marketCap: data[0].bitcoin.marketcap[data[0].bitcoin.currentprice.length-1],
	       "24hChange": data[0].bitcoin.dailychange[data[0].bitcoin.currentprice.length-1]
        }
        return res.send(ans);
     }
     else if(query==="ethereum")
     {
        const ans={
           price: data[0].ethereum.currentprice[data[0].bitcoin.currentprice.length-1],
	       marketCap: data[0].ethereum.marketcap[data[0].bitcoin.currentprice.length-1],
	       "24hChange": data[0].ethereum.dailychange[data[0].bitcoin.currentprice.length-1]
        }
        return res.send(ans);
     }
     else if(query==="matic-network")
     {
       const ans={
           price: data[0].matic_network.currentprice[data[0].bitcoin.currentprice.length-1],
	       marketCap: data[0].matic_network.marketcap[data[0].bitcoin.currentprice.length-1],
	       "24hChange": data[0].matic_network.dailychange[data[0].bitcoin.currentprice.length-1]
        }
        return res.send(ans);
     }
     else{
        res.send("wrong query");
     }
     res.send(query);

})
router.get('/diviation',async(req,res)=>{
  const query=req.body.coin;
     let data=await CoinData.find({});
     if(!data.length)
     {
        return res.send("Wait");
     }
     if(query==="bitcoin")
     {
        const ans={
           deviation:getStandardDeviation(data[0].bitcoin.currentprice)
        }
        return res.send(ans);
     }
     else if(query==="ethereum")
     {
        const ans={
           deviation:getStandardDeviation(data[0].ethereum.currentprice)
        }
        return res.send(ans);
     }
     else if(query==="matic-network")
     {
      const ans={
           deviation:getStandardDeviation(data[0].matic_network.currentprice)
        }
        return res.send(ans);
     }
     else{
        res.send("wrong query");
     }
})

export default router;