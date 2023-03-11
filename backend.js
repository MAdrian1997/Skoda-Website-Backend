import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { insereazaProdus, citesteProduse } from "./DBHelpers.js";
import { sendEmail } from "./EmailHelpers.js";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

const port = 3002;

// var jsonParser = bodyParser.json();
// Endpoint--ruta
// GET localhost:3000/mesaj
app.get("/mesaj", (req, res) => {
  res.send({ text: "M-am razgandit." });
});

app.get("/afiseaza-produse", async (req, res) => {
  try {
    const data = await citesteProduse();
    // Cursor -- toArray
    const finalData = await data.toArray();
    res.status(200).send(finalData);
  } catch (error) {
    console.log("error", error);
    res.status(400).send({ reson: "Bad request" });
  }
});
// expune pe o ruta  / pe un endpoint
// get post put delete

//req - request - ce primin noi de la api
// res - response - ce trimitem inapoi
app.post("/adauga-produs", (req, res) => {
  insereazaProdus(req.body);
  console.log(req);
  res.status(201).send("Ok");
  //   insereazaProdus({});
});

app.post("/contact", (req, res) => {
  sendEmail(req.body);
  console.log(req.body);
  res.status(201).send("Ok");
  //   insereazaProdus({});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
