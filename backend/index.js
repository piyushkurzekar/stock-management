import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import stockRoutes from "./routes/stockRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/stocks", stockRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
