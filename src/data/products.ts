import solarPanel from "@/assets/solar-panel.jpg";
import inverter from "@/assets/inverter.jpg";
import cctvCamera from "@/assets/cctv-camera.jpg";
import solarBattery from "@/assets/solar-battery.jpg";
import chargeController from "@/assets/charge-controller.jpg";
import dvrRecorder from "@/assets/dvr-recorder.jpg";
import bulletCamera from "@/assets/bullet-camera.jpg";
import hybridInverter from "@/assets/hybrid-inverter.jpg";

export type Category = "Solar" | "Inverter" | "CCTV" | "All";

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
    category: "Solar",
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
];

export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString("en-NG");
};
