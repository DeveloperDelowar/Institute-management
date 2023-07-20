import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

(async function main(){
    try{
        await mongoose.connect(config.db_url as string);
        console.log(`Database connected successfully.`);

        app.listen(config.port, ()=>{
            console.log(`Application listen on ${config.port} port.`);
        });
    }
    catch(err){
        console.log(`Database disconnected. `, err); 
    }
})()