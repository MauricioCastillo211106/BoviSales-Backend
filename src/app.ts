import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import { UserRouter } from "./UserManagment/infrestructure/routes/userRoutes";
import { CattleRouter } from "./CattleManagment/infrestructure/routes/cattleRoutes";

const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user',UserRouter);
app.use('/api/v1/cattle',CattleRouter);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});