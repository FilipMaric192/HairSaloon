import Header from "../components/header";
import Footer from "../components/footer";

import { useState } from "react";
export default function BookingPage() {
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [error, setError] = useState("");

  const getTodayString = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const [date, setDate] = useState(getTodayString());

  const getNowMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const timeToMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const generateSlots = (startTime, endTime, stepMinutes, selectedDate) => {
    const slots = [];
    const isToday = selectedDate === getTodayString();
    const nowMinutes = getNowMinutes();

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    for (let i = startMinutes; i <= endMinutes; i += stepMinutes) {
      const available = !isToday || i > nowMinutes;
      slots.push({
        time: minutesToTime(i),
        available: available,
      });
    }
    return slots;
  };

  const slots = generateSlots("09:00", "21:00", 30, date);

  const today = getTodayString();
  const isToday = date === today;

  const changeDay = (delta) => {
    if (delta < 0 && date === today) return;
    const d = new Date(date);
    d.setDate(d.getDate() + delta);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    setDate(`${yyyy}-${mm}-${dd}`);
    setTime("");
  };

  const handleReserve = async () => {
    setError("");
    if (!service) {
      setError("Odaberite uslugu!");
      return;
    }
    if (!time) {
      setError("Odaberite vrijeme!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/reservation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ service, date, time }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Greška kod rezervacije");
        return;
      }

      alert("Rezervacija uspješna");
      setTime("");
    } catch {
      setError("Server nije dostupan");
    }
  };

  const isAvailable =
    "border border-gray-200 rounded-2xl py-3 bg-white text-center font-medium cursor-pointer transition hover:shadow-sm active:scale-[0.98] transition-all";
  const disabled =
    "border border-gray-200 rounded-xl bg-gray-100 text-gray-400 py-2 text-center font-medium opacity-40 cursor-not-allowed";

  const selected =
    "bg-gray-900 text-black border-gray-900 shadow-sm ring-2 ring-black/10";
  const notSelected = "hover:border-gray-500 hover:bg-gray-50";

  return (
    <div>
      <Header />
      <main>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-10">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl flex flex-col gap-6 border border-gray-100">
            <p className="text-2xl font-bold tracking-tight">
              Rezervacija termina
            </p>
            <div className="flex  items-center gap-3">
              <label>Izaberite uslugu:</label>
              <div
                className="flex-1 border border-gray-300 
             rounded-xl focus-within:border-gray-400 px-3 py-1 bg-white"
              >
                <select
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value);
                    setTime("");
                  }}
                  className="w-full bg-transparent outline-none appearance-none py-2  text-gray-700"
                >
                  <option value="" disabled>
                    Odaberi...
                  </option>
                  <option value="1">Šišanje</option>
                  <option value="2">Brijanje</option>
                  <option value="3">Pranje</option>
                </select>
              </div>
            </div>

            <div className="mt-6 w-full rounded-2xl bg-gray-50/70 border border-gray-100 p-5 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Izaberite vrijeme:
              </p>
              <div className="flex items-center gap-2 py-4">
                <button
                  onClick={() => changeDay(-1)}
                  disabled={isToday}
                  className="h-11 w-11 bg-white rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  ←
                </button>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setTime("");
                  }}
                  className="h-11 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-400 px-3 py-2 rounded-xl border border-gray-300 w-full"
                ></input>
                <button
                  onClick={() => changeDay(+1)}
                  className="h-11 w-11 bg-white rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition"
                >
                  →
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {slots.map((slot) => (
                  <div
                    key={slot.time}
                    onClick={
                      slot.available ? () => setTime(slot.time) : undefined
                    }
                    className={`${slot.available ? isAvailable : disabled} ${slot.available ? (time === slot.time ? selected : notSelected) : ""}`}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>
              <button
                className="h-12 mt-4 w-full rounded-2xl bg-black py-2 font-semibold shadow-sm text-white hover:bg-black/90 active:scale-[0.99] transition ring-1 ring-black/10"
                onClick={handleReserve}
              >
                Rezerviraj
              </button>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
