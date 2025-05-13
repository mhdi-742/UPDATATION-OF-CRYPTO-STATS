import { connect, StringCodec } from "nats";
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
        if(data.message==="update")
        {
            console.log("hogaya");
        }
  }
  console.log("subscription closed");
}
main();