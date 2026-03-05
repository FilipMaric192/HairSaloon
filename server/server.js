import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import Reservation from "./models/Reservation.js";

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

const reservations = [];

app.get("/", (req, res) => {
  res.send("API radi ");
});

app.post("/api/reservations", async (req, res) => {
  const { service, date, time } = req.body;

  if (!service || !date || !time) {
    return res.status(400).json({ error: "..." });
  }

  const start = new Date(`${date}T${time}:00`);
  if (Number.isNaN(start.getTime())) {
    return res.status(400).json({ error: "Neispravan datum ili vrijeme." });
  }
  const now = new Date();
  if (start < now) {
    return res.status(400).json({ error: "Termin je u prošlosti." });
  }

  const exists = reservations.some((r) => {
    return r.date === date && r.time === time;
  });

  if (exists) {
    return res.status(400).json({ error: "Termin je zauzet!" });
  }

  try {
    const created = await Reservation.create({ service, date, time });
    return res.status(201).json({
      message: "Rezervacija spremljena",
      data: created,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Termin zauzet" });
    }
    console.error(err);
    return res.status(500).json({ error: "Greška na serveru" });
  }
});

app.get("/api/reservations", async (req, res) => {
  const { date } = req.query;

  try {
    if (!date) {
      const all = await Reservation.find().sort({ createdAt: -1 });
      res.json({ reservations: all });
    }

    const bookedTimes = await Reservation.find({ date }).distinct("time");
    res.json({ date, bookedTimes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška na serveru" });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });
