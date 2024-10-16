import express from "express";
import cors from "cors";
import routeComic from "./routes/comic.route.js";
import routeUser from "./routes/user.route.js";
import connectDB from "./database/data.js"
connectDB()

const app = express();

//VARS
app.set("port", process.env.PORT || 5000);

//MIDLEWARES
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/api", routeComic);
app.use("/api", routeUser);

//SERVER
app.listen(app.get("port"), () => {
  console.log("Server run in port", app.get("port"));
});
