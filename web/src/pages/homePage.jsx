import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white">
      <Header />

      <main className="flex-1 flex items-center bg-white">
        <div className="grid grid-cols-3 w-full max-w-6xl mx-auto items-center text-center">
          {/* tekst */}
          <div className="flex justify-center">
            <p className="max-w-md text-lg leading-relaxed text-black text-left py-4 px-4 border-2 rounded-xl">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...Lorem Ipsum is simply dummy text of the printing and
              typesetting industry...Lorem Ipsum is simply dummy text of the
              printing and typesetting industry...Lorem Ipsum is simply dummy
              text of the printing and typesetting industry...
            </p>
          </div>

          {/* srednji razmak */}
          <div />

          {/* gumb */}
          <div className="flex justify-center">
            <Link
              to="/booking"
              className="bg-black text-white px-12 py-6 text-xl rounded-lg"
            >
              REZERVIRAJ
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
