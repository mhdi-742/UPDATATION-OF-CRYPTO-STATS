const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const CoinDataSchema= new Schema({
 bitcoin:{
    currentprice:{
      type:[mongoose.Schema.Types.Decimal128]
    },
    marketcap:{
       type:[mongoose.Schema.Types.Decimal128]
    },
    dailychange:{
        type:[mongoose.Schema.Types.Decimal128]
    }
 },
 ethereum:{
    currentprice:{
      type:[mongoose.Schema.Types.Decimal128]
    },
    marketcap:{
       type:[mongoose.Schema.Types.Decimal128]
    },
    dailychange:{
        type:[mongoose.Schema.Types.Decimal128]
    }
 },
 matic_network:{
    currentprice:{
      type:[mongoose.Schema.Types.Decimal128]
    },
    marketcap:{
       type:[mongoose.Schema.Types.Decimal128]
    },
    dailychange:{
        type:[mongoose.Schema.Types.Decimal128]
    }
 }
},{timestamps:true});
const CoinData=mongoose.model('User',CoinDataSchema);
module.exports=CoinData; 