import { configDotenv } from "dotenv";
import express from "express";

configDotenv();
const port = process.env.PORT;

const app= express();

app.listen(port,() => {
    console.log(`app is running on the ${port}`)
})
