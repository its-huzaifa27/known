import { configDotenv } from "dotenv";
import express from "express";
import contactRoute from "./routes/contactRoutes.js";
import usersRoute from "./routes/usersRouter.js";
import { errorHnadler } from "./middlewares/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";
configDotenv();
const port = process.env.PORT;

const app = express();
const statusCode = 200;

const startServer = async() => {
    try {
        console.log("before db")
        console.log(process.env.CONNECTION_STRING)
        await connectDb();
        //mandatory to read the body thing in json withoit it it wonnot read anything from the req 
        app.use(express.json())
        app.use(errorHnadler);

        //routes
        app.use("/api/contacts/", contactRoute);
        app.use("/api/users/", usersRoute);

        app.listen(port, () => {
            console.log(`app is running on the ${port}`)
        })
    } catch (error) {
        console.log(error,"the server file fails")
    }
}
startServer();

