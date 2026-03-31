import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Solar panels at sunset"
          width={1920}
          height={800}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80" />
      </div>

      <div className="container relative z-10 flex min-h-[480px] flex-col items-start justify-center gap-5 py-20">
        <span className="inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          Trusted by 2,000+ Nigerians
        </span>
        <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Premium Solar, Inverter & CCTV Solutions
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-lg">
          Power your home and secure your property with top-quality solar panels, inverters, batteries, and CCTV systems at the best prices in Nigeria.
        </p>
        <Button
          size="lg"
          className="gradient-accent text-accent-foreground font-semibold shadow-accent border-0 hover:opacity-90 gap-2 mt-2"
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
        >
          Shop Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
