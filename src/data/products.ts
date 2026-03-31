import solarPanel from "@/assets/solar-panel.jpg";
import inverter from "@/assets/inverter.jpg";
import cctvCamera from "@/assets/cctv-camera.jpg";
import solarBattery from "@/assets/solar-battery.jpg";
import chargeController from "@/assets/charge-controller.jpg";
import dvrRecorder from "@/assets/dvr-recorder.jpg";
import bulletCamera from "@/assets/bullet-camera.jpg";
import hybridInverter from "@/assets/hybrid-inverter.jpg";
import bulletCameraOutdoor from "@/assets/bullet-camera-outdoor.jpg";
import hybridChargeController from "@/assets/hybrid-charge-controller.jpg";
import mpptChargeController from "@/assets/mppt-charge-controller.jpg";
import cctvCable from "@/assets/cctv-cable.jpg";
import domeCameraIndoor from "@/assets/dome-camera-indoor.jpg";
import felicityInverter from "@/assets/felicity-inverter.png";
import felicityLithiumBattery from "@/assets/felicity-lithium-battery.webp";
import solarPanel640w from "@/assets/solar-panel-640w.png";
import eastmanTubularBattery from "@/assets/eastman-tubular-battery.jpg";
import hausstromTubularBattery from "@/assets/hausstrom-tubular-battery.jpg";
import cctvCable2 from "@/assets/cctv-cable-2.jpg";
import domeCameraIndoor2 from "@/assets/dome-camera-indoor-2.jpg";
import bulletCameraWhite from "@/assets/bullet-camera-white.jpg";
import dvr32ch from "@/assets/dvr-32ch.jpg";
import hikvisionDvr from "@/assets/hikvision-dvr.webp";
import felicityInverter2 from "@/assets/felicity-inverter-2.webp";
import solarPanel250w from "@/assets/solar-panel-250w.png";
import rg59CableRoll from "@/assets/rg59-cable-roll.jpg";
import starplusTubularBattery from "@/assets/starplus-tubular-battery.jpg";

export type Category = "Solar" | "Inverter" | "CCTV" | "Battery" | "All";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Exclude<Category, "All">;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "350W Monocrystalline Solar Panel",
    description: "High-efficiency monocrystalline solar panel with 25-year warranty. Ideal for residential and commercial installations.",
    price: 185000,
    image: solarPanel,
    category: "Solar",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "5KVA Hybrid Inverter",
    description: "Pure sine wave hybrid inverter with MPPT charge controller. Supports solar and grid input.",
    price: 750000,
    image: hybridInverter,
    category: "Inverter",
    badge: "Popular",
  },
  {
    id: "3",
    name: "2MP Dome CCTV Camera",
    description: "Full HD 1080p dome camera with night vision up to 30m. Weatherproof IP67 rated.",
    price: 35000,
    image: cctvCamera,
    category: "CCTV",
  },
  {
    id: "4",
    name: "200Ah Lithium Battery",
    description: "Deep cycle lithium iron phosphate battery. 6000+ cycle life with built-in BMS.",
    price: 950000,
    image: solarBattery,
    category: "Battery",
    badge: "Premium",
  },
  {
    id: "5",
    name: "60A MPPT Charge Controller",
    description: "Advanced MPPT solar charge controller with LCD display. Supports 12V/24V/48V systems.",
    price: 125000,
    image: chargeController,
    category: "Solar",
  },
  {
    id: "6",
    name: "8-Channel DVR Recorder",
    description: "H.265+ compression DVR with 2TB HDD. Remote viewing via mobile app.",
    price: 95000,
    image: dvrRecorder,
    category: "CCTV",
  },
  {
    id: "7",
    name: "3.5KVA Power Inverter",
    description: "High-frequency pure sine wave inverter with built-in AVR. LCD display with intelligent fan cooling.",
    price: 385000,
    image: inverter,
    category: "Inverter",
  },
  {
    id: "8",
    name: "5MP Bullet Camera",
    description: "Ultra HD bullet camera with 50m IR night vision. Metal housing for outdoor use.",
    price: 55000,
    image: bulletCamera,
    category: "CCTV",
    badge: "New",
  },
  {
    id: "9",
    name: "Outdoor Bullet CCTV Camera",
    description: "Heavy-duty outdoor bullet camera with infrared LEDs for clear night vision up to 40m. Weatherproof metal body.",
    price: 45000,
    image: bulletCameraOutdoor,
    category: "CCTV",
  },
  {
    id: "10",
    name: "Felicity 5KVA Hybrid Inverter/Charger",
    description: "Felicity Solar hybrid inverter with built-in MPPT charge controller. Supports solar, grid, and generator input.",
    price: 850000,
    image: hybridChargeController,
    category: "Inverter",
    badge: "Popular",
  },
  {
    id: "11",
    name: "80A MPPT Solar Charge Controller",
    description: "High-capacity MPPT charge controller with LCD display. Supports 12V/24V/48V battery systems. Gold rugged casing.",
    price: 165000,
    image: mpptChargeController,
    category: "Solar",
  },
  {
    id: "12",
    name: "CCTV Coaxial Cable (100m)",
    description: "Premium RG59 coaxial cable with power cable for CCTV installations. 100-metre roll with copper core.",
    price: 28000,
    image: cctvCable,
    category: "CCTV",
  },
  {
    id: "13",
    name: "Indoor Dome CCTV Camera",
    description: "Compact indoor dome camera with IR night vision. Easy ceiling mount installation. Ideal for offices and shops.",
    price: 25000,
    image: domeCameraIndoor,
    category: "CCTV",
  },
  {
    id: "14",
    name: "Felicity 10KVA Inverter",
    description: "Felicity Solar 10KVA pure sine wave inverter. High-capacity unit for large homes and commercial use.",
    price: 1450000,
    image: felicityInverter,
    category: "Inverter",
    badge: "Premium",
  },
  {
    id: "15",
    name: "Felicity 17.5KWh Lithium Battery",
    description: "Felicity 17.5KWh 51.2V 350Ah lithium iron phosphate battery. Built-in BMS with 6000+ cycle life. On wheels for easy positioning.",
    price: 4500000,
    image: felicityLithiumBattery,
    category: "Battery",
    badge: "Premium",
  },
  {
    id: "16",
    name: "640W Monocrystalline Solar Panel",
    description: "High-output 640W monocrystalline solar panel. Half-cut cell technology for maximum efficiency. Ideal for large systems.",
    price: 320000,
    image: solarPanel640w,
    category: "Solar",
    badge: "New",
  },
  {
    id: "17",
    name: "Eastman 200Ah Tubular Battery",
    description: "Eastman 12V 200Ah tall tubular battery. Designed for inverter and solar backup systems. Long-lasting deep cycle performance.",
    price: 185000,
    image: eastmanTubularBattery,
    category: "Battery",
  },
  {
    id: "18",
    name: "Haus Strom 200Ah Tubular Battery",
    description: "Haus Strom HS-20055 tall tubular battery. Long backup capability with deep cycle design for solar and inverter use.",
    price: 195000,
    image: hausstromTubularBattery,
    category: "Battery",
    badge: "Best Seller",
  },
];

export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString("en-NG");
};
