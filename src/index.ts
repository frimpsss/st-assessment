import express from "express";
import { connectDB } from "./config";
import { Request, Response } from "express";
import blogRouter from "./routes/blog.routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const PORT = (process.env.PORT as string) || 8080;

app.use(express.json(), bodyParser.json());
app.use("/api", blogRouter);
app.all("/", (req: Request, res: Response) => {
  res.status(200).send("Ok");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log("server up and running on port:", PORT);
});
