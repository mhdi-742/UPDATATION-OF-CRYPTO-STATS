const express=require('express');
const apiserver=express();
const mongoose=require('mongoose');
const url="mongodb://localhost:27017/koinx";
let cors=require('cors');
const routes=require('./routes/routes');
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

