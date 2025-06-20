import { mongoose } from "mongoose";
// The basic Mongo DB schema
const Schema=mongoose.Schema;
const CoinDataSchema= new Schema({
 bitcoin:{
    currentprice:{
      type:[Number]
    },
    marketcap:{
       type:[Number]
    },
    dailychange:{
        type:[Number]
    }
 },
 ethereum:{
    currentprice:{
      type:[Number]
    },
    marketcap:{
       type:[Number]
    },
    dailychange:{
        type:[Number]
    }
 },
 matic_network:{
    currentprice:{
      type:[Number]
    },
    marketcap:{
       type:[Number]
    },
    dailychange:{
        type:[Number]
    }
 }
},{timestamps:true});
const CoinData=mongoose.model('User',CoinDataSchema);
export default CoinData;