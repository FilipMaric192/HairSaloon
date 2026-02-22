import express from "express";
import cors from "cors";
const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API radi ");
});

app.post("/api/reservation", (req, res) => {
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
  return res.status(200).json({
    message: "Rezervacija validna (demo).",
    data: { service, date, time },
  });
});

app.listen(port, () => {
  console.log("Server running on port 5000");
});
