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
import felicity35kva from "@/assets/felicity-3.5kva-inverter.jpg";
import ptzCamera from "@/assets/ptz-camera.jpg";
import felicity10kwhBattery from "@/assets/felicity-10kwh-battery.jpg";
import solarPanel550w from "@/assets/solar-panel-550w.jpg";
import ptzDomeCamera from "@/assets/ptz-dome-camera.jpg";
import felicity8kvaHybrid from "@/assets/felicity-8kva-hybrid.jpg";
import solarPtzCamera from "@/assets/solar-ptz-camera.jpg";
import felicity5kvaOffgrid from "@/assets/felicity-5kva-offgrid.jpg";

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
  {
    id: "19",
    name: "CCTV Siamese Cable (200m)",
    description: "Premium RG59 siamese coaxial cable with power. 200-metre roll for large CCTV installations. Copper core for best signal.",
    price: 48000,
    image: cctvCable2,
    category: "CCTV",
  },
  {
    id: "20",
    name: "2MP Indoor Dome Camera",
    description: "Compact 2MP indoor dome camera with IR LEDs for night vision. Easy ceiling mount. Perfect for homes and offices.",
    price: 22000,
    image: domeCameraIndoor2,
    category: "CCTV",
  },
  {
    id: "21",
    name: "ABUS Outdoor Bullet Camera",
    description: "ABUS 5MP outdoor bullet camera with weatherproof housing. Clear day and night recording with smart IR.",
    price: 65000,
    image: bulletCameraWhite,
    category: "CCTV",
  },
  {
    id: "22",
    name: "32-Channel DVR Recorder",
    description: "Professional 32-channel DVR with H.265+ compression. Rack-mountable design for large-scale CCTV systems.",
    price: 285000,
    image: dvr32ch,
    category: "CCTV",
    badge: "Pro",
  },
  {
    id: "23",
    name: "Hikvision 4-Channel DVR",
    description: "Hikvision Turbo HD 4-channel DVR. H.265 Pro+ compression with remote viewing via Hik-Connect app.",
    price: 55000,
    image: hikvisionDvr,
    category: "CCTV",
    badge: "Popular",
  },
  {
    id: "24",
    name: "Felicity 8KVA Hybrid Inverter",
    description: "Felicity Solar 8KVA hybrid inverter with built-in MPPT. Touchscreen display, supports solar and grid input.",
    price: 1150000,
    image: felicityInverter2,
    category: "Inverter",
  },
  {
    id: "25",
    name: "250W Polycrystalline Solar Panel",
    description: "Durable 250W polycrystalline solar panel. Cost-effective option for residential solar installations with 20-year warranty.",
    price: 115000,
    image: solarPanel250w,
    category: "Solar",
  },
  {
    id: "26",
    name: "RG59 Cable Roll (305m)",
    description: "Industrial-grade RG59 coaxial cable. 305-metre spool for professional CCTV installations. Pure copper conductor.",
    price: 65000,
    image: rg59CableRoll,
    category: "CCTV",
  },
  {
    id: "27",
    name: "Star Plus 220Ah Tubular Battery",
    description: "Star Plus 12V 220Ah tall tubular battery. Heavy-duty deep cycle design for inverter and solar backup systems.",
    price: 210000,
    image: starplusTubularBattery,
    category: "Battery",
    badge: "New",
  },
  // New Felicity products
  {
    id: "28",
    name: "Felicity 3.5KVA 24V Inverter",
    description: "Felicity 3.5KVA transformer-based pure sine wave inverter. 24V system with LCD display. Ideal for homes and small offices.",
    price: 222000,
    image: felicity35kva,
    category: "Inverter",
  },
  {
    id: "29",
    name: "Felicity 5KVA Off-Grid Inverter",
    description: "Felicity 5KVA 48V pure sine wave off-grid inverter. MPPT charge controller compatible. Overload and short-circuit protection.",
    price: 970000,
    image: felicity5kvaOffgrid,
    category: "Inverter",
    badge: "Popular",
  },
  {
    id: "30",
    name: "Felicity 10KWh Lithium Battery",
    description: "Felicity 10KWh 48V lithium iron phosphate battery. Built-in BMS with 6000+ cycle life. Compact cabinet design.",
    price: 2800000,
    image: felicity10kwhBattery,
    category: "Battery",
    badge: "Premium",
  },
  {
    id: "31",
    name: "Felicity 15KVA Hybrid Inverter",
    description: "Felicity Solar 15KVA three-phase hybrid inverter with touchscreen display. Built-in 120A MPPT. For large commercial installations.",
    price: 2200000,
    image: felicity8kvaHybrid,
    category: "Inverter",
    badge: "Pro",
  },
  // New Solar products
  {
    id: "32",
    name: "550W Monocrystalline Solar Panel",
    description: "High-efficiency 550W mono PERC solar panel. Half-cut cell technology with 25-year performance warranty. Ideal for commercial rooftops.",
    price: 275000,
    image: solarPanel550w,
    category: "Solar",
  },
  // New CCTV / PTZ products
  {
    id: "33",
    name: "2MP PTZ Speed Dome Camera",
    description: "Full HD 1080p PTZ speed dome camera with 20x optical zoom. 360° pan, 90° tilt. IR night vision up to 100m. IP66 weatherproof.",
    price: 175000,
    image: ptzCamera,
    category: "CCTV",
    badge: "New",
  },
  {
    id: "34",
    name: "Dahua 4MP Mini PTZ Dome Camera",
    description: "Dahua 4MP mini PTZ dome IP camera with 4x optical zoom. POE powered, outdoor rated. Smart IR up to 50m. Remote pan/tilt/zoom control.",
    price: 220000,
    image: ptzDomeCamera,
    category: "CCTV",
    badge: "Popular",
  },
  {
    id: "35",
    name: "Solar 4G PTZ Camera",
    description: "Solar-powered 4G PTZ CCTV camera with built-in solar panel. No wiring needed. 3MP dual lens, 360° rotation. Perfect for farms and remote sites.",
    price: 185000,
    image: solarPtzCamera,
    category: "CCTV",
    badge: "New",
  },
];

export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString("en-NG");
};
