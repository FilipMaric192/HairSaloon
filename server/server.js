import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

const reservations = [];

app.get("/", (req, res) => {
  res.send("API radi ");
});

app.post("/api/reservations", (req, res) => {
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

  reservations.push({ service, date, time });

  return res.status(201).json({
    message: "Rezervacija spremljena",
    data: { service, date, time },
  });
});

app.get("/api/reservations", (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.json({ reservations });
  }

  const bookedTimes = reservations
    .filter((r) => r.date === date)
    .map((r) => r.time);

  return res.json({ date, bookedTimes });
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
