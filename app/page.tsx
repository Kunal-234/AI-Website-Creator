import Header from "@/components/Header";
import FloatingLines from "@/components/ui/FloatingLines";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black relative max-h-screen overflow-hidden">
      <Header />

      <div className="w-full h-screen relative">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={5}
          lineDistance={5}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={["045D5D"]}
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <div className="my-6 py-1.5 w-[50%] max-sm:text-sm md:w-fit md:px-6 rounded-4xl font-light bg-white/5 text-white/80 cursor-pointer border border-teal-300/30">
          <span className="font-semibold text-white/70"> WaveForge AI:</span> version 1.0
        </div>

        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-tight">
          Surf the Waves of Web <br /> Design with AI
        </div>

        <div className="mt-6 pt-3 flex flex-row gap-3">
          <Link href={'/workspace'} className="mx-0 sm:mx-3 rounded-4xl sm:px-8 px-6 py-2 sm:py-2 bg-white/80 text-black/90 cursor-pointer sm:w-auto hover:opacity-70">
            Get Started
          </Link>
          <button className="mx-0 sm:mx-3 rounded-4xl sm:px-8 px-6 py-2 sm:py-2 font-light bg-white/5 text-white/80 cursor-pointer border hover:opacity-70 border-teal-300/40  sm:w-auto">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}