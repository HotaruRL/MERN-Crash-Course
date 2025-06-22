import express from 'express';
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './config/db.js';
import cors from 'cors';

import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
// || 5000 is an extra port for falling back to in case the other port doesn't work
const PORT = process.env.PORT || 5050

const __dirname = path.resolve();

app.use(cors());

app.use(express.json()); // allow to accept JSON data in the req.body

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontEnd/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontEnd", "dist", "index.html"));
    })
}

// port is 5000
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})
