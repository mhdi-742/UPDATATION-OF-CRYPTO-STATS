import { connect, StringCodec } from "nats";

//main function which has the nats publish code.

const main=async()=>{
    const nc=await connect ({
        servers:[
            "localhost:4222"
        ]
    })
    //console.log("Connected to NATS");
    const sc=StringCodec();
    const publishFunction=()=>{
        nc.publish("pub",sc.encode(JSON.stringify({ trigger: "update" })))
    };
    publishFunction();
    setInterval(publishFunction, 15 *60* 1000);// requests are send every 15 mins
}
main();