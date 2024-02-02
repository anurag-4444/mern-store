import express from "express";
import product from "./routes/productRoute.js"
import { errorMiddleware } from "./middleware/error.js";
import user from "./routes/userRoute.js"
import cart from "./routes/cartRoute.js"
import wishlist from "./routes/wishlistRoute.js"
import cookieParser from "cookie-parser";
import order from "./routes/orderRoute.js"
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from "url";

const app = express();

app.use(cors())

// To send the json over the server
app.use(express.json())

// To get the token in the cookie
app.use(cookieParser())

// for uploading image
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", cart)
app.use("/api/v1", wishlist)

// const rootDir = "C:\\project\\E-Commerce app"; // Specify the root directory

const absolutePath = path.resolve(__dirname, "frontend", "build");

app.use(express.static(absolutePath));
app.get("/", (req, res) => {
    res.sendFile(path.join(absolutePath, "index.html"));
});

// Using Error Middleware
app.use(errorMiddleware)

export default app; 