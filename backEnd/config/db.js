import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`SUCCESS: MongoDB Connected to host: ${conn.connection.host} and db: ${conn.connection.name}`);
    }catch (error){
        console.error(`ERROR: Could not connect to MongoDB.`, error);
        process.exit(1); // 1 means exit with failure, 0 means success
    }
};