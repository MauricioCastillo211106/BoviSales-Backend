import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import { UserRouter } from "./UserManagment/infrestructure/routes/userRoutes";
import { CattleRouter } from "./CattleManagment/infrestructure/routes/cattleRoutes";
import fileUpload from 'express-fileupload'; 
import * as admin from "firebase-admin";
import dotenv from "dotenv";

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS!);
const app = express();
const signale = new Signale();

// Inicializa Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.STOREAGEBUCKET
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura express-fileupload
app.use(fileUpload()); 

app.use('/api/v1/user',UserRouter);
app.use('/api/v1/cattle',CattleRouter);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});