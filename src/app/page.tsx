import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import TranscriptProcessor from "@/components/TranscriptProcessor";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <TranscriptProcessor /> */}
      <Header />

      <Hero />
      <Footer />
    </div>
  );
}
