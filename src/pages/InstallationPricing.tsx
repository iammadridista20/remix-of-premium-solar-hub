import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/hooks/useProducts";

interface PricingItem {
  service: string;
  description: string;
  locations: { area: string; price: number }[];
}

const pricingData: PricingItem[] = [
  {
    service: "Solar Panel Installation",
    description: "Complete solar panel mounting, wiring, and connection to inverter system.",
    locations: [
      { area: "Lagos / Abuja", price: 150000 },
      { area: "Port Harcourt / Ibadan", price: 180000 },
      { area: "Other States", price: 220000 },
    ],
  },
  {
    service: "Inverter Installation",
    description: "Inverter setup with battery connection, changeover, and wiring.",
    locations: [
      { area: "Lagos / Abuja", price: 80000 },
      { area: "Port Harcourt / Ibadan", price: 100000 },
      { area: "Other States", price: 130000 },
    ],
  },
  {
    service: "Full Solar System Setup",
    description: "Complete solar system: panels, inverter, batteries, charge controller, and wiring.",
    locations: [
      { area: "Lagos / Abuja", price: 350000 },
      { area: "Port Harcourt / Ibadan", price: 400000 },
      { area: "Other States", price: 480000 },
    ],
  },
  {
    service: "CCTV Installation (4 Cameras)",
    description: "4-camera CCTV system with DVR, cabling, and configuration.",
    locations: [
      { area: "Lagos / Abuja", price: 70000 },
      { area: "Port Harcourt / Ibadan", price: 85000 },
      { area: "Other States", price: 100000 },
    ],
  },
  {
    service: "CCTV Installation (8 Cameras)",
    description: "8-camera CCTV system with DVR, cabling, and full setup.",
    locations: [
      { area: "Lagos / Abuja", price: 120000 },
      { area: "Port Harcourt / Ibadan", price: 140000 },
      { area: "Other States", price: 170000 },
    ],
  },
  {
    service: "Battery Setup / Replacement",
    description: "Battery bank installation or replacement with wiring and testing.",
    locations: [
      { area: "Lagos / Abuja", price: 40000 },
      { area: "Port Harcourt / Ibadan", price: 55000 },
      { area: "Other States", price: 70000 },
    ],
  },
  {
    service: "Maintenance & Repair",
    description: "Troubleshooting, panel cleaning, battery check, and system optimization.",
    locations: [
      { area: "Lagos / Abuja", price: 30000 },
      { area: "Port Harcourt / Ibadan", price: 40000 },
      { area: "Other States", price: 50000 },
    ],
  },
];

const InstallationPricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={0} onCartOpen={() => {}} />

      <section className="container py-16">
        <div className="text-center mb-12">
          <h1 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-2">
            Installation Pricing
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Transparent pricing based on service type and location. All prices include labour, tools, and basic materials.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {pricingData.map((item) => (
            <div key={item.service} className="rounded-lg border bg-card shadow-card overflow-hidden">
              <div className="p-5 border-b bg-muted/30">
                <h3 className="font-heading text-lg font-semibold text-card-foreground">{item.service}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
              <div className="divide-y">
                {item.locations.map((loc) => (
                  <div key={loc.area} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-muted-foreground">{loc.area}</span>
                    <span className="font-heading font-bold text-foreground">{formatNaira(loc.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Prices may vary based on site complexity and additional materials. Contact us for a custom quote.
          </p>
          <Link to="/book-installation">
            <Button className="gap-2">
              Book Installation <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default InstallationPricing;
