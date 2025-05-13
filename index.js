import { connect, StringCodec } from "nats";
const main=async()=>{
    const nc=await connect ({
        servers:[
            "localhost:4222"
        ]
    })
    console.log("Connected to NATS");
    const sc=StringCodec();
    nc.publish("pub",sc.encode(JSON.stringify({message:"updte"})));
}
main();