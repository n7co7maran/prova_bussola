import express from "express";
import cors from "cors";
import { createComputadorRoute } from "./modules/computador/computador.routes";
import { createPerifericoRoute } from "./modules/periferico/periferico.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/computador", createComputadorRoute());
app.use("/periferico", createPerifericoRoute());

export {app};