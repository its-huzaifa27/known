import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            serverSelectionTimeoutMS: 5000, // ← fails after 5s instead of hanging
        });
        console.log("connected to database successfully")
        console.log(connect.connection.host);
        console.log(connect.connection.name);
    } catch (error) {
        console.log(error, "connection failed");
        process.exit(1);
    }
}
export { connectDb }