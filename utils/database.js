import mongoose from "mongoose";

let isConnected = false; // acompanha a conexão

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDb is Connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log("MongoDb connected")
    } catch (error) {
        console.log("MongoDB connection error :", error)
    }
}

