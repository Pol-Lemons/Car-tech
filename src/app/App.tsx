import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, Grid3X3, List, X, ChevronDown, SlidersHorizontal,
  Zap, Gauge, Fuel, Scale, ArrowRight, Plus, Check, GitCompare,
  Star, ChevronLeft, ChevronRight, LayoutGrid, Heart
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const BRANDS = ["All","Toyota", "Honda", "Tesla", "Kia"];
const CATEGORIES = ["All", "Sedan", "SUV", "Truck", "Electric"];
const MARKETPLACES = [
  {
    name: "CarMax",
    type: "Dealer marketplace",
    url: "https://www.carmax.com",
  },
  {
    name: "Carvana",
    type: "Online used car retailer",
    url: "https://www.carvana.com",
  },
  {
    name: "Kelley Blue Book",
    type: "Pricing + listings",
    url: "https://www.kbb.com/used-cars",
  },
  {
    name: "Facebook Marketplace",
    type: "Private sellers",
    url: "https://www.facebook.com/marketplace/category/vehicles",
  },
  {
    name: "CarFax",
    type: "Online used cars retailer and VIN checking",
    url: "https://www.carfax.com",
  },
  {
    name: "Offerup",
    type: "Private sellers",
    url: "https://offerup.com/explore/k/5",
  },
];
interface Trim {
  name: string;
  price: number;
  hp: number;
  totalMonthly: string;
  zeroToSixty?: string;

  cityMpg?: number;
  hwyMpg?: number;
  insuranceMonthly?: number;
  maintenanceBase?: number;
}

interface Car {
  id: string;
  categories?: ("Sedan"|"SUV"| "Truck"| "Electric") [];
  brand: string;
  model: string;
  year: number;
  image: string;
  badge?: string;
  rating: number;
  trims: Trim[];
  generation?: GenerationData[];
  specs: {
    engine: string;
    transmission: string;
    drivetrain: string;
    economy: string;
    fuelType: string;
    seats?: string;
    passengerVolume?: string;
    cargoSpace?: string;
    towingCapacity?: string;
    zeroToSixty?: string;
    
  };
}
interface GenerationData{
  id: string;
  label: string;
  estimatedYear: number;
  image : string;
  unavailableTrims? : string[],
  specs: {
    engine: string;
    transmission: string;
    drivetrain: string;
    economy: string;
    fuelType: string;
    seats?: string;
    passengerVolume?: string;
    cargoSpace?: string;
    towingCapacity?: string;
    zeroToSixty?: string;
    
  };
}

const CARS: Car[] = [
  {
    id: "toyota-camry-xse",
    brand: "Toyota",
    model: "Camry",
    year: 2026,
    categories: ["Sedan"],
    image: "https://phantom.estaticos-marca.com/54597bf300089330bb0dd240628f5dca/crop/0x0/1978x1318/resize/1320/f/jpg/assets/multimedia/imagenes/2026/03/05/17726740367584.png",
    badge: "Popular",
    rating: 4.9,
    generation: [
      {
    id: "camry-xv80",
    label: "2025-Present XV80",
    estimatedYear: 2026,
    image: "https://phantom.estaticos-marca.com/54597bf300089330bb0dd240628f5dca/crop/0x0/1978x1318/resize/1320/f/jpg/assets/multimedia/imagenes/2026/03/05/17726740367584.png",
    specs: {
      engine: "2.5L Inline-4 Hybrid",
      transmission: "E-CVT automatic transmission",
      drivetrain: "FWD or AWD",
      economy: "45 / 47 mpg",
      fuelType: "Gasoline Hybrid",
    },
  },
      
       {
    id: "camry-xv70",
    label: "2018-2024 XV70",
    estimatedYear: 2019,
    image: "https://tse1.mm.bing.net/th/id/OIP.cZmJI8AfjtES3CFjlzYpAQHaEY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    specs: {
      engine: "2.5L I4 Gasoline/Hybrid or 3.5L V6 Gasoline",
      transmission: "8-Speed automatic",
      drivetrain: "FWD or AWD",
      economy: "28 / 39 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id:"camry-xv60",
    label: "2015-2017 XV60",
    estimatedYear: 2015,
    image:"https://tractionlife.com/wp-content/uploads/2014/10/2015-toyota-camry-review-2-of-25.jpg",
    specs:{
      engine:"2.5L I4 Gasoline/Hybrid or 3.5 V6 Gasoline",
      transmission:"6-Speed automatic",
      drivetrain:"FWD",
      economy: "24 / 33 mpg",
      fuelType: "Gasoline"
    }
  },
  {
     id: "camry-xv50",
    label: "2012-2014 XV50",
    estimatedYear: 2013,
    image: "https://images.cars.com/cldstatic/wp-content/uploads/1325156035-1425510327145.jpeg",
    unavailableTrims: ["XSE"],
    specs: {
      engine: "2.5L I4 Gasoline/Hybrid or 3.5 V6 Gasoline",
      transmission: "6-Speed automatic",
      drivetrain: "FWD",
      economy: "25 / 35 mpg",
      fuelType: "Gasoline" ,
    },
    
  },
  {
  id: "camry-xv40",
  label: "2007-2011 XV40",
  estimatedYear: 2009,
  image: "https://th.bing.com/th/id/R.aaba096d63dc8ad6d785461074d2833a?rik=rNHhWe71OAtcrg&riu=http%3a%2f%2fcarspecmn.com%2fwp-content%2fuploads%2f2015%2f02%2fToyotaCamry2007.jpg&ehk=bG8Cv8UBREDB9kc1qSv5M5Oc08Or%2bsLCjH%2brbXs6aQ0%3d&risl=&pid=ImgRaw&r=0",
  unavailableTrims: ["XSE"],
  specs: {
    engine: "2.4L Inline-4 Gasoline or 3.5 V6 Gasoline",
    transmission: "5-speed automatic",
    drivetrain: "FWD",
    economy: "21 / 31 mpg",
    fuelType: "Gasoline",
    
  },
},
  
  
],
        
      
    
    trims: [
      { name: "LE", price: 29000, hp: 225, totalMonthly: "$300-$500" },
      { name: "SE", price: 31000, hp: 225, totalMonthly: "$320-$530" },
      { name: "XLE", price: 34000, hp: 232, totalMonthly: "$350-$570" },
      { name: "XSE", price: 36000, hp: 232, totalMonthly: "$330-$553" },
    ],
    specs: {
      engine: "2.5L Inline-4 Hybrid",
      transmission: "E-CVT automatic transmission",
      drivetrain: "FWD or AWD",
      economy: "45 / 47 mpg",
      fuelType: "Gasoline Hybrid",
      seats: "5",
      passengerVolume: "99.9 cu ft",
      cargoSpace: "15.1 cu ft",
      towingCapacity: "Not recommended",
      zeroToSixty: "Around 7.0 sec",
    },
  },

  {
    id: "honda-civic-sport",
    brand: "Honda",
    model: "Civic",
    year: 2026,
    categories: ["Sedan"],
    image: "https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1280.jpg",
    badge: "Efficient",
    rating: 4.8,
    
    generation: [
      {
    id: "civic-11th-gen",
    label: "2022-2026 11th Gen",
    estimatedYear: 2024,
    image: "https://media.ed.edmunds-media.com/honda/civic/2026/oem/2026_honda_civic_sedan_si_fq_oem_1_1280.jpg",
    unavailableTrims: [],
    specs: {
      engine: "2.0L Inline-4 or 1.5L Turbo Inline-4",
      transmission: "CVT automatic",
      drivetrain: "FWD",
      economy: "31 / 40 mpg",
      fuelType: "Gasoline",
    },
  },
   {
    id: "civic-10th-gen",
    label: "2016-2021 10th Gen",
    estimatedYear: 2019,
    image: "https://autonxt.net/wp-content/uploads/2019/12/2020-Honda-Civic-Si32.jpg",
    unavailableTrims: [],
    specs: {
      engine: "2.0L Inline-4 or 1.5L Turbo Inline-4",
      transmission: "CVT automatic",
      drivetrain: "FWD",
      economy: "30 / 38 mpg",
      fuelType: "Gasoline",
    },
  },
 
  {
    id: "civic-9th-gen",
    label: "2012-2015 9th Gen",
    estimatedYear: 2014,
    image: "https://cdn.wallpapersafari.com/49/66/j0zaxP.jpg",
    unavailableTrims: ["Sport", "Touring"],
    specs: {
      engine: "1.8L Inline-4 Gasoline",
      transmission: "5-speed automatic or CVT",
      drivetrain: "FWD",
      economy: "28 / 39 mpg",
      fuelType: "Gasoline",
    },
  },
 
  
  {
    id: "civic-8th-gen",
    label: "2006-2011 8th Gen",
    estimatedYear: 2009,
    image: "https://file.kelleybluebookimages.com/kbb/base/house/2010/2010-Honda-Civic-FrontSide_HOCIVSISED101_505x375.jpg?interpolation=high-quality&downsize=600:*",
    unavailableTrims: ["Sport", "Touring"],
    specs: {
      engine: "1.8L Inline-4 Gasoline",
      transmission: "5-speed automatic",
      drivetrain: "FWD",
      economy: "25 / 36 mpg",
      fuelType: "Gasoline",
    },
  },
],

      
    
    trims: [
      { name: "LX", price: 25000, hp: 150, totalMonthly: "$280-$460" },
      { name: "Sport", price: 27000, hp: 150, totalMonthly: "$300-$490" },
      { name: "Hybrid", price: 30000, hp: 200, totalMonthly: "$320-$520" },
      { name: "Si", price: 31000, hp: 200, totalMonthly: "$340-$560" },
    ],
    specs: {
      engine: "2.0L Inline-4 / Hybrid / 1.5L Turbocharged",
      transmission: "CVT / 6-speed manual on Si",
      drivetrain: "FWD",
      economy: "32 / 41 mpg",
      fuelType: "Gasoline or Hybrid",
      seats: "5",
      passengerVolume: "99.0 cu ft",
      cargoSpace: "14.8 cu ft",
      towingCapacity: "Not recommended",
      zeroToSixty: "Around 7.5 sec", 
    },
  },

  {
    id: "honda-accord-ex",
    brand: "Honda",
    model: "Accord",
    year: 2026,
    categories: ["Sedan"],
    image: "https://tse2.mm.bing.net/th/id/OIP.jpmBgWUzOsBXeBHwzLCmpQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    badge: "Family Pick",
    rating: 4.8,
    generation: [
      {
    id: "accord-11th-gen",
    label: "2023-Present 11th Gen",
    estimatedYear: 2024,
    image: "https://tse2.mm.bing.net/th/id/OIP.jpmBgWUzOsBXeBHwzLCmpQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    unavailableTrims: [],
    specs: {
      engine: "1.5L Turbo I4 / 2.0L Hybrid",
      transmission: "CVT / e-CVT automatic",
      drivetrain: "FWD",
      economy: "29 / 37 mpg or 51 / 44 mpg hybrid",
      fuelType: "Gasoline / Hybrid",
    },
  },
  {
    id: "accord-10th-gen",
    label: "2018-2022 10th Gen",
    estimatedYear: 2020,
    image: "https://media.ed.edmunds-media.com/honda/accord/2018/oem/2018_honda_accord_sedan_sport_fq_oem_10_815.jpg",
    unavailableTrims: [],
    specs: {
      engine: "1.5L Turbo I4 / 2.0L Turbo Inline-4 / Hybrid",
      transmission: "CVT or 10-speed automatic / e-CVT Hybrid",
      drivetrain: "FWD",
      economy: "30 / 38 mpg or higher with hybrid",
      fuelType: "Gasoline",
    },
  },
  
  
  {
    id: "accord-9th-gen",
    label: "2013-2017 9th Gen",
    estimatedYear: 2015,
    image: "https://wallpaperaccess.com/full/5490979.jpg",
    unavailableTrims: [],
    specs: {
      engine: "2.4L I4 Gasoline / 3.5 V6 Gasoline / Hybrid",
      transmission: "CVT, 6-Speed automatic / 6-Speed Manual",
      drivetrain: "FWD",
      economy: "27 / 36 mpg or lower with V6",
      fuelType: "Gasoline",
    },
  },
  {
    id: "accord-8th-gen",
    label: "2008-2012 8th Gen",
    estimatedYear: 2010,
    image: "https://tse3.mm.bing.net/th/id/OIP.Oig3vPJuxXoIeEVSQTfkIwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    unavailableTrims: ["Sport", "Touring"],
    specs: {
      engine: "2.4L I4 Gasoline / 3.5L V6 Gasoline",
      transmission: "5-speed automatic",
      drivetrain: "FWD",
      economy: "23 / 34 mpg or lower with V6",
      fuelType: "Gasoline",
    },
  },
  
],
    trims: [
      { name: "LX", price: 29000, hp: 192, totalMonthly: "$320-$520" },
      { name: "EX", price: 31000, hp: 192, totalMonthly: "$340-$550" },
      { name: "Sport Hybrid", price: 34000, hp: 204, totalMonthly: "$360-$590" },
      { name: "Touring Hybrid", price: 39000, hp: 204, totalMonthly: "$410-$660" },
    ],
    specs: {
      engine: "1.5L Turbo / 2.0L Hybrid",
      transmission: "CVT / E-CVT",
      drivetrain: "FWD",
      economy: "29 / 37 mpg",
      fuelType: "Gasoline or Hybrid",
      seats: "5",
      passengerVolume: "105.7 cu ft",
      cargoSpace: "16.7 cu ft",
      towingCapacity: "Not recommended",
      zeroToSixty: "Around 7.3 sec",
    },
  },

  {
    id: "toyota-corolla-se",
    brand: "Toyota",
    model: "Corolla",
    year: 2026,
    categories: ["Sedan"],
    image: "https://pressroom.toyota.com/wp-content/uploads/2025/07/Thumbnail_2026_Corolla_XSE_WindChillPearl_EXT_B_ROLL-1500x900.png",
    badge: "Low Cost",
    rating: 4.7,
    generation: [
  {
    id: "corolla-12th-gen",
    label: "2020-2026 12th Gen",
    estimatedYear: 2023,
    image: "https://pressroom.toyota.com/wp-content/uploads/2025/07/Thumbnail_2026_Corolla_XSE_WindChillPearl_EXT_B_ROLL-1500x900.png",
    unavailableTrims: [],
    specs: {
      engine: "2.0L I4 Gasoline or 1.8L I4 Hybrid",
      transmission: "CVT automatic",
      drivetrain: "FWD or AWD Hybrid",
      economy: "32 / 41 mpg or higher with Hybrid",
      fuelType: "Gasoline / Hybrid",
    },
  },
  {
    id: "corolla-11th-gen",
    label: "2014-2019 11th Gen",
    estimatedYear: 2016,
    image: "https://cdn-fastly.autoguide.com/media/2023/06/26/12909058/2018-toyota-corolla-review.jpg?size=414x575&nocrop=1",
    unavailableTrims: ["Hybrid"],
    specs: {
      engine: "1.8L I4 Gasoline",
      transmission: "CVT automatic or 6-speed manual",
      drivetrain: "FWD",
      economy: "28 / 36 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id: "corolla-10th-gen",
    label: "2009-2013 10th Gen",
    estimatedYear: 2011,
    image: "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2025/01/2009-2010-toyota-corolla-xrs-front-3_4.jpg?q=50&fit=crop&w=480&dpr=1.5",
    unavailableTrims: ["Hybrid", "XSE"],
    specs: {
      engine: "1.8L I4 or 2.4L I4 Gasoline",
      transmission: "4-speed automatic or 5-speed manual",
      drivetrain: "FWD",
      economy: "27 / 34 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id: "corolla-9th-gen",
    label: "2004-2008 9th Gen",
    estimatedYear: 2006,
    image: "https://www.hongliyangzhi.com/manufacturers/toyota/toyota-corolla/toyota-corolla-xrs-2005/toyota-corolla-xrs-2005-7.jpg",
    unavailableTrims: ["Hybrid", "SE", "XSE"],
    specs: {
      engine: "1.8L I4 Gasoline",
      transmission: "4-speed automatic or 5-speed manual",
      drivetrain: "FWD",
      economy: "26 / 35 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id: "corolla-8th-gen",
    label: "1998-2003 Older Gen",
    estimatedYear: 2001,
    image: "https://global.toyota/pages/corolla50th/gallery/images/oversea/small/18_9th_Gen_Corolla_2003_2008_s.jpg",
    unavailableTrims: ["Hybrid", "SE", "XSE"],
    specs: {
      engine: "1.8L I4 Gasoline",
      transmission: "4-speed automatic or 5-speed manual",
      drivetrain: "FWD",
      economy: "28 / 37 mpg",
      fuelType: "Gasoline",
    },
  },
],
    trims: [
      { name: "LE", price: 23000, hp: 169, totalMonthly: "$260-$430" },
      { name: "SE", price: 25000, hp: 169, totalMonthly: "$280-$460" },
      { name: "XSE", price: 29000, hp: 169, totalMonthly: "$310-$510" },
      { name: "Hybrid", price: 26000, hp: 138, totalMonthly: "$270-$450" },
    ],
    specs: {
      engine: "2.0L Inline-4 / Hybrid available",
      transmission: "CVT",
      drivetrain: "FWD or AWD Hybrid",
      economy: "32 / 41 mpg",
      fuelType: "Gasoline or Hybrid",
      seats: "5",
      passengerVolume: "88.6 cu ft",
      cargoSpace: "13.1 cu ft",
      towingCapacity: "Not recommended",
      zeroToSixty: "Around 8.0 sec",
    },
  },

  {
    id: "toyota-rav4-xle",
    brand: "Toyota",
    model: "RAV4",
    year: 2026,
    categories: ["SUV"],
    image: "https://www.examiner.com.au/images/transform/v1/crop/frm/silverstone-feed-data/6a30c655-90f6-4cb5-b0ec-2404e8ce1e92.jpg/r0_0_1490_790_w1200_h678_fmax.jpg",
    badge: "SUV Pick",
    rating: 4.8,
   
    generation: [
  {
    id: "rav4-6th-gen",
    label: "2026-Present 6th Gen",
    estimatedYear: 2026,
    image: "https://www.examiner.com.au/images/transform/v1/crop/frm/silverstone-feed-data/6a30c655-90f6-4cb5-b0ec-2404e8ce1e92.jpg/r0_0_1490_790_w1200_h678_fmax.jpg",
    unavailableTrims: [],
    specs: {
      engine: "2.5L I4 Hybrid or Plug-in Hybrid",
      transmission: "E-CVT automatic",
      drivetrain: "FWD or AWD",
      economy: "Hybrid / Plug-in Hybrid estimate",
      fuelType: "Hybrid / Plug-in Hybrid",
    },
  },
  {
    id: "rav4-5th-gen",
    label: "2019-2025 5th Gen",
    estimatedYear: 2022,
    image: "https://images.drive.com.au/driveau/image/upload/c_fill,f_auto,g_auto,h_674,q_auto:eco,w_1200/cms/uploads/y80ho64pomaqgvtxlez5",
    unavailableTrims: [],
    specs: {
      engine: "2.5L I4 Gasoline / Hybrid / Plug-in Hybrid",
      transmission: "8-speed automatic or E-CVT hybrid",
      drivetrain: "FWD or AWD",
      economy: "27 / 35 mpg or higher with Hybrid",
      fuelType: "Gasoline / Hybrid / Plug-in Hybrid",
    },
  },
  {
    id: "rav4-4th-gen",
    label: "2013-2018 4th Gen",
    estimatedYear: 2016,
    image: "https://www.kbb.com/wp-content/uploads/2020/12/2018-toyota-rav4-front-3qtr.jpg?w=757",
    unavailableTrims: ["Hybrid XSE"],
    specs: {
      engine: "2.5L I4 Gasoline or Hybrid",
      transmission: "6-speed automatic or E-CVT hybrid",
      drivetrain: "FWD or AWD",
      economy: "23 / 30 mpg or higher with Hybrid",
      fuelType: "Gasoline / Hybrid",
    },
  },
  {
    id: "rav4-3rd-gen",
    label: "2006-2012 3rd Gen",
    estimatedYear: 2009,
    image: "https://media.ed.edmunds-media.com/toyota/rav4/2012/oem/2012_toyota_rav4_4dr-suv_sport_fq_oem_5_815.jpg",
    unavailableTrims: ["Adventure", "Hybrid XSE"],
    specs: {
      engine: "2.5L I4 or 3.5L V6 Gasoline",
      transmission: "4-speed or 5-speed automatic",
      drivetrain: "FWD or AWD",
      economy: "22 / 28 mpg or lower with V6",
      fuelType: "Gasoline",
    },
  },
  {
    id: "rav4-2nd-gen",
    label: "2001-2005 2nd Gen",
    estimatedYear: 2003,
    image: "https://th.bing.com/th/id/R.18c0e3c4212c0fbbf3bdda4012a150b9?rik=A1JbUndzTpqfaQ&riu=http%3a%2f%2fimages.thecarconnection.com%2flrg%2f2005_toyota_rav4_100008160_l.jpg&ehk=Ao%2fMO56bbDlcFdbBQpCi3GTayLhjoixltc3bGoVkTFE%3d&risl=&pid=ImgRaw&r=0",
    unavailableTrims: ["Adventure", "Hybrid XSE"],
    specs: {
      engine: "2.0L I4 or 2.4L I4 Gasoline",
      transmission: "4-speed automatic or 5-speed manual",
      drivetrain: "FWD or AWD",
      economy: "22 / 27 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id: "rav4-1st-gen",
    label: "1996-2000 1st Gen",
    estimatedYear: 1998,
    image: "https://img.carswp.com/toyota/rav4/photos_toyota_rav4_1998_4_b.jpg",
    unavailableTrims: ["Adventure", "Hybrid XSE"],
    specs: {
      engine: "2.0L I4 Gasoline",
      transmission: "4-speed automatic or 5-speed manual",
      drivetrain: "FWD or AWD",
      economy: "22 / 27 mpg",
      fuelType: "Gasoline",
    },
  },

],
    trims: [
      { name: "LE", price: 31000, hp: 203, totalMonthly: "$350-$570" },
      { name: "XLE", price: 34000, hp: 203, totalMonthly: "$380-$610" },
      { name: "Adventure", price: 38000, hp: 203, totalMonthly: "$420-$670" },
      { name: "Hybrid XSE", price: 41000, hp: 219, totalMonthly: "$440-$700" },
    ],
    specs: {
      engine: "2.5L Inline-4 / Hybrid available",
      transmission: "8-speed automatic / E-CVT Hybrid",
      drivetrain: "FWD or AWD",
      economy: "27 / 35 mpg",
      fuelType: "Gasoline or Hybrid",
      seats: "5",
      passengerVolume: "98.9 cu ft",
      cargoSpace: "37.6 / 69.8 cu ft",
      towingCapacity: "Up to 3,500 lbs",
      zeroToSixty: "Around 8.0 sec",
    },
  },

  {
    id: "tesla-model-3-long-range",
    brand: "Tesla",
    model: "Model 3",
    year: 2026,
    categories: ["Electric", "Sedan"],
    image: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/2024/04/tesla-model-3-performance-hero-image.jpg",
    badge: "Electric",
    rating: 4.7,
    generation: [
  {
    id: "model3-highland",
    label: "2024-2026 Highland Refresh",
    estimatedYear: 2025,
    image: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/2024/04/tesla-model-3-performance-hero-image.jpg",
    unavailableTrims: [],
    specs: {
      engine: "Single or Dual Electric Motor",
      transmission: "Single-speed automatic",
      drivetrain: "RWD or AWD",
      economy: "Electric range estimate",
      fuelType: "Electric",
    },
  },
  {
    id: "model3-original",
    label: "2017-2023 Original Model 3",
    estimatedYear: 2021,
    image: "https://hips.hearstapps.com/hmg-prod/images/2019-tesla-model-3-101-1574807022.jpg?crop=0.614xw:0.742xh;0.0765xw,0.258xh&resize=640:*",
    unavailableTrims: [],
    specs: {
      engine: "Single or Dual Electric Motor",
      transmission: "Single-speed automatic",
      drivetrain: "RWD or AWD",
      economy: "Electric range estimate",
      fuelType: "Electric",
    },
  },
],
    trims: [
      { name: "RWD", price: 39000, hp: 283, totalMonthly: "$430-$690" },
      { name: "Long Range", price: 45000, hp: 394, totalMonthly: "$480-$760" },
      { name: "Performance", price: 53000, hp: 510, totalMonthly: "$560-$880" },
    
    ],
    specs: {
      engine: "Electric Motor",
      transmission: "Single-speed automatic",
      drivetrain: "RWD or AWD",
      economy: "Electric range estimate",
      fuelType: "Electric",
      seats: "5",
     passengerVolume: "97.0 cu ft",
     cargoSpace: "24.0 cu ft total",
      towingCapacity: "Not recommended",
      zeroToSixty: "Around 4.2 sec",
    },
  },
  {
  id: "toyota-tacoma-trd",
  brand: "Toyota",
  model: "Tacoma",
  year: 2026,
  categories: ["Truck"],
  image: "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/11/2024-toyota-tacoma-trd-pro-44.jpg",
  badge: "Truck Pick",
  rating: 4.8,

  generation: [
    {
      id: "tacoma-4th-gen",
      label: "2024-Present 4th Gen",
      estimatedYear: 2025,
      image: "https://static0.carbuzzimages.com/wordpress/wp-content/uploads/2024/11/2024-toyota-tacoma-trd-pro-44.jpg",
      unavailableTrims: [],
      specs: {
        engine: "2.4L Turbo I4 or 2.4L Turbo Hybrid I4",
        transmission: "8-speed automatic or 6-speed manual",
        drivetrain: "RWD or 4WD",
        economy: "20 / 26 mpg or hybrid estimate",
        fuelType: "Gasoline / Hybrid",
      },
    },
    {
      id: "tacoma-3rd-gen",
      label: "2016-2023 3rd Gen",
      estimatedYear: 2020,
      image: "https://carsfera.com/wp-content/uploads/2023/07/Screenshot-2023-07-25-at-9.19.28-PM.png",
      unavailableTrims: ["Trailhunter"],
      specs: {
        engine: "2.7L I4 or 3.5L V6 Gasoline",
        transmission: "6-speed automatic or 6-speed manual",
        drivetrain: "RWD or 4WD",
        economy: "19 / 24 mpg or lower with V6",
        fuelType: "Gasoline",
      },
    },
    {
      id: "tacoma-2nd-gen",
      label: "2005-2015 2nd Gen",
      estimatedYear: 2010,
      image: "https://th.bing.com/th/id/R.74c096d7d7594dbb6cf0dcece6a30e6e?rik=JNY3YCEAyXa1Fg&riu=http%3a%2f%2fst.motortrendenespanol.com%2fuploads%2fsites%2f45%2f2014%2f12%2f2015-Toyota-Tacoma-TRD-Pro-front-three-quarter-02.jpg&ehk=7pgI6ETmMLP5aXTc89cZNUXakwZS7hkud9WVMybP8TU%3d&risl=&pid=ImgRaw&r=0",
      unavailableTrims: ["TRD Pro", "Trailhunter"],
      specs: {
        engine: "2.7L I4 or 4.0L V6 Gasoline",
        transmission: "5-speed automatic, 6-speed manual, or 5-speed manual",
        drivetrain: "RWD or 4WD",
        economy: "18 / 22 mpg or lower with V6",
        fuelType: "Gasoline",
      },
    },
    {
      id: "tacoma-1st-gen",
      label: "1995-2004 1st Gen",
      estimatedYear: 2001,
      image: "https://bringatrailer.com/wp-content/uploads/2023/06/2004_toyota_tacoma_dsc_0952-27996.jpeg?w=768",
      unavailableTrims: ["TRD Sport", "TRD Pro", "Trailhunter", "Limited"],
      specs: {
        engine: "2.4L I4, 2.7L I4, or 3.4L V6 Gasoline",
        transmission: "4-speed automatic or 5-speed manual",
        drivetrain: "RWD or 4WD",
        economy: "18 / 22 mpg",
        fuelType: "Gasoline",
      },
    },
  ],

  trims: [
    {
      name: "SR",
      price: 32000,
      hp: 228,
      totalMonthly: "$360-$590",
      cityMpg: 20,
      hwyMpg: 26,
      insuranceMonthly: 150,
      maintenanceBase: 85,
    },
    {
      name: "SR5",
      price: 37000,
      hp: 278,
      totalMonthly: "$410-$660",
      cityMpg: 20,
      hwyMpg: 26,
      insuranceMonthly: 160,
      maintenanceBase: 90,
    },
    {
      name: "TRD Sport",
      price: 42000,
      hp: 278,
      totalMonthly: "$460-$720",
      cityMpg: 19,
      hwyMpg: 24,
      insuranceMonthly: 175,
      maintenanceBase: 95,
    },
    {
      name: "TRD Off-Road",
      price: 44000,
      hp: 278,
      totalMonthly: "$480-$750",
      cityMpg: 19,
      hwyMpg: 24,
      insuranceMonthly: 180,
      maintenanceBase: 100,
    },
    {
      name: "Limited",
      price: 53000,
      hp: 278,
      totalMonthly: "$570-$890",
      cityMpg: 19,
      hwyMpg: 24,
      insuranceMonthly: 200,
      maintenanceBase: 105,
    },
    {
      name: "Trailhunter",
      price: 64000,
      hp: 326,
      totalMonthly: "$680-$1050",
      cityMpg: 22,
      hwyMpg: 24,
      insuranceMonthly: 230,
      maintenanceBase: 115,
    },
  ],

  specs: {
    engine: "2.4L Turbo I4 or Hybrid",
    transmission: "8-speed automatic or 6-speed manual",
    drivetrain: "RWD or 4WD",
    economy: "20 / 26 mpg",
    fuelType: "Gasoline / Hybrid",
    seats: "4-5",
    passengerVolume: "Crew cab estimate",
    cargoSpace: "5-ft or 6-ft bed",
    towingCapacity: "Up to 6,500 lbs",
    zeroToSixty: "Around 7.0 sec",
  },
},
{
  id: "honda-CRV",
  brand: "Honda",
  model: "CR-V",
  year: 2026,
  categories: ["SUV"],
  image: "https://www.kbb.com/wp-content/uploads/2024/10/2025-honda-cr-v-hybrid-front-left-3qtr.jpg?w=757",
  badge: "Best SUV 2026",
  rating: 5.0,

  generation: [
    {
    id: "crv-6th-gen",
    label: "2023-Present 6th Gen",
    estimatedYear: 2025,
    image: "https://www.kbb.com/wp-content/uploads/2024/10/2025-honda-cr-v-hybrid-front-left-3qtr.jpg?w=757",
    unavailableTrims: [],
    specs: {
      engine: "1.5L Turbo I4 or 2.0L Hybrid",
      transmission: "CVT or e-CVT automatic",
      drivetrain: "FWD or AWD",
      economy: "28 / 34 mpg or higher with Hybrid",
      fuelType: "Gasoline / Hybrid",
    },
  },
  {
    id: "crv-5th-gen",
    label: "2017-2022 5th Gen",
    estimatedYear: 2020,
    image: "https://wallpapers.com/images/featured-full/honda-cr-v-wbp7f1ukrnx1bu83.jpg",
    unavailableTrims: [],
    specs: {
      engine: "1.5L Turbo I4 or 2.0L Hybrid",
      transmission: "CVT automatic",
      drivetrain: "FWD or AWD",
      economy: "28 / 34 mpg or higher with Hybrid",
      fuelType: "Gasoline / Hybrid",
    },
  },
  {
    id: "crv-4th-gen",
    label: "2012-2016 4th Gen",
    estimatedYear: 2014,
    image: "https://wieck-honda-production.s3-us-west-1.amazonaws.com/videos/5e17b994c2b1e96d9c6413383c749678196b9352/frame-10.0.jpg",
    unavailableTrims: ["Sport Hybrid", "Sport-L Hybrid", "Sport Touring Hybrid"],
    specs: {
      engine: "2.4L I4 Gasoline",
      transmission: "5-speed automatic or CVT",
      drivetrain: "FWD or AWD",
      economy: "26 / 33 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id: "crv-3rd-gen",
    label: "2007-2011 3rd Gen",
    estimatedYear: 2009,
    image: "https://tse1.mm.bing.net/th/id/OIP.-gTRF1emyVFzKckH04JdZAHaE6?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    unavailableTrims: ["Sport Hybrid", "Sport-L Hybrid", "Sport Touring Hybrid"],
    specs: {
      engine: "2.4L I4 Gasoline",
      transmission: "5-speed automatic",
      drivetrain: "FWD or AWD",
      economy: "21 / 28 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id: "crv-2nd-gen",
    label: "2002-2006 2nd Gen",
    estimatedYear: 2004,
    image: "https://file.kelleybluebookimages.com/kbb/base/house/2006/2006-Honda-CR-V-FrontSide_HTCRV061_505x375.jpg",
    unavailableTrims: ["Sport Hybrid", "Sport-L Hybrid", "Sport Touring Hybrid"],
    specs: {
      engine: "2.4L I4 Gasoline",
      transmission: "4-speed or 5-speed automatic",
      drivetrain: "FWD or AWD",
      economy: "22 / 27 mpg",
      fuelType: "Gasoline",
    },
  },
  {
    id: "crv-1st-gen",
    label: "1997-2001 1st Gen",
    estimatedYear: 1999,
    image: "https://th.bing.com/th/id/R.a4b3508d1e59b539691e7736388eac96?rik=BWNpOOblBuW1sQ&pid=ImgRaw&r=0",
    unavailableTrims: ["EX-L", "Sport Hybrid", "Sport-L Hybrid", "Sport Touring Hybrid"],
    specs: {
      engine: "2.0L I4 Gasoline",
      transmission: "4-speed automatic or 5-speed manual",
      drivetrain: "FWD or AWD",
      economy: "22 / 25 mpg",
      fuelType: "Gasoline",
    },
  },
],
trims: [
    {
      name: "LX",
      price: 31000,
      hp: 190,
      totalMonthly: "$350-$570",
      cityMpg: 28,
      hwyMpg: 34,
      insuranceMonthly: 145,
      maintenanceBase: 80,
    },
    {
      name: "EX",
      price: 34000,
      hp: 190,
      totalMonthly: "$380-$610",
      cityMpg: 28,
      hwyMpg: 34,
      insuranceMonthly: 155,
      maintenanceBase: 85,
    },
    {
      name: "EX-L",
      price: 37000,
      hp: 190,
      totalMonthly: "$410-$660",
      cityMpg: 28,
      hwyMpg: 34,
      insuranceMonthly: 165,
      maintenanceBase: 90,
    },
    {
      name: "Sport Hybrid",
      price: 36000,
      hp: 204,
      totalMonthly: "$400-$650",
      cityMpg: 43,
      hwyMpg: 36,
      insuranceMonthly: 165,
      maintenanceBase: 85,
    },
    {
      name: "TrailSport Hybrid",
      price: 40000,
      hp: 204,
      totalMonthly: "$450-$720",
      cityMpg: 38,
      hwyMpg: 33,
      insuranceMonthly: 180,
      maintenanceBase: 95,
    },
    {
      name: "Sport-L Hybrid",
      price: 40000,
      hp: 204,
      totalMonthly: "$450-$720",
      cityMpg: 43,
      hwyMpg: 36,
      insuranceMonthly: 180,
      maintenanceBase: 90,
    },
    {
      name: "Sport Touring Hybrid",
      price: 43000,
      hp: 204,
      totalMonthly: "$480-$770",
      cityMpg: 40,
      hwyMpg: 34,
      insuranceMonthly: 195,
      maintenanceBase: 95,
    },
  ],

  specs: {
    engine: "1.5L Turbo I4 or 2.0L Hybrid",
    transmission: "CVT or e-CVT automatic",
    drivetrain: "FWD or AWD",
    economy: "28 / 34 mpg or higher with Hybrid",
    fuelType: "Gasoline / Hybrid",
    seats: "5",
    passengerVolume: "106.0 cu ft",
    cargoSpace: "39.3 / 76.5 cu ft",
    towingCapacity: "Up to 1,500 lbs",
    zeroToSixty: "Around 7.6 sec",
  },
},
{
  id: "tesla-model-y-performance",
  brand: "Tesla",
  model: "Model Y",
  year: 2026,
  categories: ["SUV", "Electric"],
  image:"https://static0.topspeedimages.com/wordpress/wp-content/uploads/2025/09/2026-tesla-model-y-performance-8.jpg?q=49&fit=crop&w=825&dpr=2",
  badge: "Electric SUV",
  rating: 4.8,

  generation: [
    {
      id: "model-y-juniper",
      label: "2026-Present Juniper Refresh",
      estimatedYear: 2026,
      image: "https://www.edmunds.com/assets/m/cs/cms/030987c2-78ad-446c-920d-0235a13d2977/2026-tesla-model-y-performance_600.jpg",
      unavailableTrims: [],
      specs: {
        engine: "Single or Dual Electric Motor",
        transmission: "Single-speed automatic",
        drivetrain: "RWD or AWD",
        economy: "Electric range estimate",
        fuelType: "Electric",
      },
    },
    {
      id: "model-y-original",
      label: "2020-2025 Original Model Y",
      estimatedYear: 2022,
      image: "https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2023/08/3-16.jpg",
      unavailableTrims: ["Premium RWD", "Premium AWD"],
      specs: {
        engine: "Single or Dual Electric Motor",
        transmission: "Single-speed automatic",
        drivetrain: "RWD or AWD",
        economy: "Electric range estimate",
        fuelType: "Electric",
      },
    },
  ],

  trims: [
    {
      name: "RWD",
      price: 45000,
      hp: 295,
      totalMonthly: "$490-$780",
      cityMpg: 125,
      hwyMpg: 110,
      insuranceMonthly: 210,
      maintenanceBase: 45,
    },
    {
      name: "Premium RWD",
      price: 48000,
      hp: 295,
      totalMonthly: "$520-$820",
      cityMpg: 125,
      hwyMpg: 110,
      insuranceMonthly: 220,
      maintenanceBase: 45,
    },
    {
      name: "Premium AWD",
      price: 52000,
      hp: 384,
      totalMonthly: "$560-$880",
      cityMpg: 120,
      hwyMpg: 105,
      insuranceMonthly: 235,
      maintenanceBase: 50,
    },
    {
      name: "Long Range AWD",
      price: 54000,
      hp: 384,
      totalMonthly: "$580-$920",
      cityMpg: 120,
      hwyMpg: 105,
      insuranceMonthly: 240,
      maintenanceBase: 50,
    },
    {
      name: "Performance AWD",
      price: 61000,
      hp: 510,
      totalMonthly: "$650-$1020",
      cityMpg: 110,
      hwyMpg: 100,
      insuranceMonthly: 270,
      maintenanceBase: 55,
    },
  ],

  specs: {
    engine: "Single or Dual Electric Motor",
    transmission: "Single-speed automatic",
    drivetrain: "RWD or AWD",
    economy: "Electric range estimate",
    fuelType: "Electric",
    seats: "5",
    passengerVolume: "106.0 cu ft",
    cargoSpace: "30.2 / 72.1 cu ft",
    towingCapacity: "Up to 3,500 lbs",
    zeroToSixty: "Around 4.8 sec",
  },
},
{
  id: "honda-pilot-trailsport",
  brand: "Honda",
  model: "Pilot",
  year: 2026,
  image: "https://images.caricos.com/h/honda/2026_honda_pilot/images/2560x1440/2026_honda_pilot_15_2560x1440.jpg",
  badge: "Family SUV",
  rating: 4.8,

  generation: [
    {
      id: "pilot-4th-gen",
      label: "2023-2026 4th Gen",
      estimatedYear: 2025,
      image: "https://images.caricos.com/h/honda/2026_honda_pilot/images/2560x1440/2026_honda_pilot_15_2560x1440.jpg",
      unavailableTrims: [],
      specs: {
        engine: "3.5L V6 Gasoline",
        transmission: "10-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "19 / 27 mpg",
        fuelType: "Gasoline",
      },
    },
    {
      id: "pilot-3rd-gen",
      label: "2016-2022 3rd Gen",
      estimatedYear: 2019,
      image: "https://content-images.carmax.com/qeontfmijmzv/15xScCrCEB5g9Pl3KWXmGd/4c2168bbf805bbf451e73bbb40451d62/01-Exterior_Pilot_2.jpg?w=2100&fm=webp",
      unavailableTrims: ["TrailSport", "Black Edition"],
      specs: {
        engine: "3.5L V6 Gasoline",
        transmission: "6-speed or 9-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "19 / 27 mpg",
        fuelType: "Gasoline",
      },
    },
    {
      id: "pilot-2nd-gen",
      label: "2009-2015 2nd Gen",
      estimatedYear: 2012,
      image: "https://tse3.mm.bing.net/th/id/OIP.aYLR1uE4SjcW7fCaKvX3bQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      unavailableTrims: ["Sport", "TrailSport", "Black Edition"],
      specs: {
        engine: "3.5L V6 Gasoline",
        transmission: "5-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "18 / 25 mpg",
        fuelType: "Gasoline",
      },
    },
    {
      id: "pilot-1st-gen",
      label: "2003-2008 1st Gen",
      estimatedYear: 2006,
      image: "https://bringatrailer.com/wp-content/uploads/2025/01/2008_honda_pilot_img_1346-2-54540.jpg",
      unavailableTrims: ["Sport", "TrailSport", "Touring", "Elite", "Black Edition"],
      specs: {
        engine: "3.5L V6 Gasoline",
        transmission: "5-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "16 / 22 mpg",
        fuelType: "Gasoline",
      },
    },
  ],

  trims: [
    {
      name: "Sport",
      price: 43000,
      hp: 285,
      totalMonthly: "$470-$750",
      cityMpg: 19,
      hwyMpg: 27,
      insuranceMonthly: 175,
      maintenanceBase: 90,
    },
    {
      name: "EX-L",
      price: 46000,
      hp: 285,
      totalMonthly: "$500-$800",
      cityMpg: 19,
      hwyMpg: 27,
      insuranceMonthly: 185,
      maintenanceBase: 95,
    },
    {
      name: "TrailSport",
      price: 50000,
      hp: 285,
      totalMonthly: "$540-$860",
      cityMpg: 18,
      hwyMpg: 23,
      insuranceMonthly: 200,
      maintenanceBase: 105,
    },
    {
      name: "Touring",
      price: 51000,
      hp: 285,
      totalMonthly: "$550-$880",
      cityMpg: 19,
      hwyMpg: 27,
      insuranceMonthly: 205,
      maintenanceBase: 100,
    },
    {
      name: "Elite",
      price: 55000,
      hp: 285,
      totalMonthly: "$590-$940",
      cityMpg: 19,
      hwyMpg: 25,
      insuranceMonthly: 220,
      maintenanceBase: 110,
    },
    {
      name: "Black Edition",
      price: 57000,
      hp: 285,
      totalMonthly: "$610-$970",
      cityMpg: 19,
      hwyMpg: 25,
      insuranceMonthly: 230,
      maintenanceBase: 115,
    },
  ],

  specs: {
    engine: "3.5L V6 Gasoline",
    transmission: "10-speed automatic",
    drivetrain: "FWD or AWD",
    economy: "19 / 27 mpg",
    fuelType: "Gasoline",
    seats: "7-8",
   passengerVolume: "158.4 cu ft",
   cargoSpace: "18.6 / 87.0 cu ft",
   towingCapacity: "Up to 5,000 lbs",
   zeroToSixty: "Around 6.9 sec",
  },
},
{
  id: "toyota-highlander-limited",
  brand: "Toyota",
  model: "Highlander",
  year: 2026,
  categories: ["SUV"],
  image: "https://media.ed.edmunds-media.com/toyota/highlander-hybrid/2022/oem/2022_toyota_highlander-hybrid_4dr-suv_platinum_fq_oem_1_815.jpg",
  badge: "Family SUV",
  rating: 4.8,

  generation: [
    {
      id: "highlander-4th-gen",
      label: "2020-Present 4th Gen",
      estimatedYear: 2024,
      image: "https://media.ed.edmunds-media.com/toyota/highlander-hybrid/2022/oem/2022_toyota_highlander-hybrid_4dr-suv_platinum_fq_oem_1_815.jpg",
      unavailableTrims: [],
      specs: {
        engine: "2.4L Turbo I4 or 2.5L Hybrid I4",
        transmission: "8-speed automatic or e-CVT hybrid",
        drivetrain: "AWD",
        economy: "21 / 28 mpg or 35 mpg combined hybrid",
        fuelType: "Gasoline / Hybrid",
      },
    },
    {
      id: "highlander-3rd-gen",
      label: "2014-2019 3rd Gen",
      estimatedYear: 2017,
      image: "https://images.hgmsites.net/hug/2019-toyota-highlander_100674055_h.jpg",
      unavailableTrims: ["XSE"],
      specs: {
        engine: "2.7L I4, 3.5L V6, or Hybrid V6",
        transmission: "6-speed or 8-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "20 / 27 mpg or higher with hybrid",
        fuelType: "Gasoline / Hybrid",
      },
    },
    {
      id: "highlander-2nd-gen",
      label: "2008-2013 2nd Gen",
      estimatedYear: 2011,
      image: "https://annuelauto.ca/wp-content/uploads/2022/02/010%20highlander%20hybrid.jpg",
      unavailableTrims: ["XSE", "Platinum"],
      specs: {
        engine: "2.7L I4, 3.5L V6, or Hybrid V6",
        transmission: "5-speed or 6-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "18 / 24 mpg or higher with hybrid",
        fuelType: "Gasoline / Hybrid",
      },
    },
    {
      id: "highlander-1st-gen",
      label: "2001-2007 1st Gen",
      estimatedYear: 2005,
      image: "https://static0.topspeedimages.com/wordpress/wp-content/uploads/jpg/200608/2007-toyota-highlander-hy-13.jpg",
      unavailableTrims: ["XSE", "Platinum"],
      specs: {
        engine: "2.4L I4 or 3.3L V6 Gasoline",
        transmission: "4-speed or 5-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "18 / 24 mpg",
        fuelType: "Gasoline",
      },
    },
  ],

  trims: [
    {
      name: "XLE",
      price: 45000,
      hp: 265,
      totalMonthly: "$500-$790",
      cityMpg: 21,
      hwyMpg: 28,
      insuranceMonthly: 175,
      maintenanceBase: 95,
    },
    {
      name: "XSE",
      price: 48000,
      hp: 265,
      totalMonthly: "$530-$840",
      cityMpg: 21,
      hwyMpg: 28,
      insuranceMonthly: 185,
      maintenanceBase: 100,
    },
    {
      name: "Limited",
      price: 51000,
      hp: 265,
      totalMonthly: "$560-$890",
      cityMpg: 21,
      hwyMpg: 28,
      insuranceMonthly: 200,
      maintenanceBase: 105,
    },
    {
      name: "Platinum",
      price: 56000,
      hp: 265,
      totalMonthly: "$610-$970",
      cityMpg: 21,
      hwyMpg: 28,
      insuranceMonthly: 220,
      maintenanceBase: 110,
    },
    {
      name: "Hybrid XLE",
      price: 48000,
      hp: 243,
      totalMonthly: "$520-$830",
      cityMpg: 35,
      hwyMpg: 35,
      insuranceMonthly: 190,
      maintenanceBase: 90,
    },
  ],

  specs: {
    engine: "2.4L Turbo I4 or 2.5L Hybrid I4",
    transmission: "8-speed automatic or e-CVT hybrid",
    drivetrain: "AWD",
    economy: "21 / 28 mpg or 35 mpg combined hybrid",
    fuelType: "Gasoline / Hybrid",
    seats: "7-8",
   passengerVolume: "141.3 cu ft",
   cargoSpace: "16.0 / 84.3 cu ft",
   towingCapacity: "Up to 5,000 lbs",
   zeroToSixty: "Around 7.2 sec",
  },
},
{
  id: "kia-telluride-sx-prestige",
  brand: "Kia",
  model: "Telluride",
  year: 2027,
  categories: ["SUV"],
  image: "https://autoimage.capitalone.com/cms/Auto/assets/images/3974-inset01-2027-kia-telluride-hybrid-x-line-front-quarter.jpg",
  badge: "3-Row SUV",
  rating: 4.8,

  generation: [
    {
      id: "telluride-2nd-gen",
      label: "2027-Present 2nd Gen",
      estimatedYear: 2027,
      image: "https://autoimage.capitalone.com/cms/Auto/assets/images/3974-inset01-2027-kia-telluride-hybrid-x-line-front-quarter.jpg",
      unavailableTrims: [],
      specs: {
        engine: "2.5L Turbo I4 or Turbo Hybrid",
        transmission: "8-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "20 / 26 mpg or 35 mpg combined hybrid",
        fuelType: "Gasoline / Hybrid",
      },
    },
    {
      id: "telluride-1st-gen",
      label: "2020-2025 1st Gen",
      estimatedYear: 2023,
      image: "https://media.ed.edmunds-media.com/kia/telluride/2023/oem/2023_kia_telluride_4dr-suv_base_fq_oem_1_1280.jpg",
      unavailableTrims: ["Hybrid EX", "Hybrid SX", "Hybrid SX Prestige"],
      specs: {
        engine: "3.8L V6 Gasoline",
        transmission: "8-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "20 / 26 mpg",
        fuelType: "Gasoline",
      },
    },
  ],

  trims: [
    {
      name: "LX",
      price: 41000,
      hp: 274,
      totalMonthly: "$460-$730",
      cityMpg: 20,
      hwyMpg: 26,
      insuranceMonthly: 175,
      maintenanceBase: 90,
    },
    {
      name: "S",
      price: 44000,
      hp: 274,
      totalMonthly: "$490-$780",
      cityMpg: 20,
      hwyMpg: 26,
      insuranceMonthly: 185,
      maintenanceBase: 95,
    },
    {
      name: "EX",
      price: 47000,
      hp: 274,
      totalMonthly: "$520-$830",
      cityMpg: 20,
      hwyMpg: 26,
      insuranceMonthly: 195,
      maintenanceBase: 100,
    },
    {
      name: "SX",
      price: 52000,
      hp: 274,
      totalMonthly: "$570-$910",
      cityMpg: 20,
      hwyMpg: 26,
      insuranceMonthly: 210,
      maintenanceBase: 105,
    },
    {
      name: "SX Prestige",
      price: 57000,
      hp: 274,
      totalMonthly: "$620-$990",
      cityMpg: 20,
      hwyMpg: 26,
      insuranceMonthly: 230,
      maintenanceBase: 115,
    },
    {
      name: "Hybrid EX",
      price: 48000,
      hp: 329,
      totalMonthly: "$530-$850",
      cityMpg: 35,
      hwyMpg: 35,
      insuranceMonthly: 200,
      maintenanceBase: 90,
    },
    {
      name: "Hybrid SX",
      price: 54000,
      hp: 329,
      totalMonthly: "$590-$940",
      cityMpg: 35,
      hwyMpg: 35,
      insuranceMonthly: 220,
      maintenanceBase: 95,
    },
    {
      name: "Hybrid SX Prestige",
      price: 60000,
      hp: 329,
      totalMonthly: "$650-$1040",
      cityMpg: 35,
      hwyMpg: 35,
      insuranceMonthly: 240,
      maintenanceBase: 105,
    },
  ],

  specs: {
    engine: "2.5L Turbo I4 or Turbo Hybrid",
    transmission: "8-speed automatic",
    drivetrain: "FWD or AWD",
    economy: "20 / 26 mpg or 35 mpg combined hybrid",
    fuelType: "Gasoline / Hybrid",
    seats: "7-8",
   passengerVolume: "178.1 cu ft",
   cargoSpace: "21.0 / 87.0 cu ft",
   towingCapacity: "Up to 5,000 lbs",
   zeroToSixty: "Around 7.0 sec",
  },
},
  {
  id: "honda-ridgeline-trailsport",
  brand: "Honda",
  model: "Ridgeline",
  year: 2026,
  categories:["Truck"],
  image:"https://www.motortrend.com/files/68c9cbab9e5282000282e530/2026hondaridgelineawdpickuptruck-8.jpg?w=768&width=768&q=75&format=webp",
  badge: "Midsize Truck",
  rating: 4.7,

  generation: [
    {
      id: "ridgeline-2nd-gen-refresh",
      label: "2024-Present 2nd Gen Refresh",
      estimatedYear: 2025,
      image: "https://www.edmunds.com/assets/m/honda/ridgeline/2026/oem/2026_honda_ridgeline_crew-cab-pickup_trailsport_fq_oem_1_600x400.jpg",
      unavailableTrims: [],
      specs: {
        engine: "3.5L V6 Gasoline",
        transmission: "9-speed automatic",
        drivetrain: "AWD",
        economy: "18 / 24 mpg",
        fuelType: "Gasoline",
        seats: "5",
        passengerVolume: "109.7 cu ft",
        cargoSpace: "5.3-ft bed + in-bed trunk",
        towingCapacity: "Up to 5,000 lbs",
        zeroToSixty: "Around 6.5 sec",
      },
    },
    {
      id: "ridgeline-2nd-gen",
      label: "2015-2023 2nd Gen",
      estimatedYear: 2020,
      image: "https://media.ed.edmunds-media.com/honda/ridgeline/2020/oem/2020_honda_ridgeline_crew-cab-pickup_black-edition_fq_oem_2_815.jpg",
      unavailableTrims: ["TrailSport"],
      specs: {
        engine: "3.5L V6 Gasoline",
        transmission: "6-speed or 9-speed automatic",
        drivetrain: "FWD or AWD",
        economy: "18 / 24 mpg",
        fuelType: "Gasoline",
        seats: "5",
        passengerVolume: "109.7 cu ft",
        cargoSpace: "5.3-ft bed + in-bed trunk",
        towingCapacity: "Up to 5,000 lbs",
        zeroToSixty: "Around 6.6 sec",
      },
    },
    {
      id: "ridgeline-1st-gen",
      label: "2006-2014 1st Gen",
      estimatedYear: 2010,
      image: "https://consumerguide.com/wp-content/uploads/bfi_thumb/2014_Honda_Ridgeline_Sport_02-e1381853781954-lhbp81u9qlawj19co14zqojekhrw38subjo2icchi8.jpg",
      unavailableTrims: ["Sport", "TrailSport", "Black Edition"],
      specs: {
        engine: "3.5L V6 Gasoline",
        transmission: "5-speed automatic",
        drivetrain: "AWD",
        economy: "15 / 21 mpg",
        fuelType: "Gasoline",
        seats: "5",
        passengerVolume: "112.0 cu ft",
        cargoSpace: "5-ft bed + in-bed trunk",
        towingCapacity: "Up to 5,000 lbs",
        zeroToSixty: "Around 7.5 sec",
      },
    },
  ],

  trims: [
    {
      name: "Sport",
      price: 41000,
      hp: 280,
      totalMonthly: "$450-$720",
      cityMpg: 18,
      hwyMpg: 24,
      insuranceMonthly: 170,
      maintenanceBase: 90,
    },
    {
      name: "RTL",
      price: 44000,
      hp: 280,
      totalMonthly: "$480-$770",
      cityMpg: 18,
      hwyMpg: 24,
      insuranceMonthly: 180,
      maintenanceBase: 95,
    },
    {
      name: "TrailSport",
      price: 47000,
      hp: 280,
      totalMonthly: "$510-$820",
      cityMpg: 18,
      hwyMpg: 23,
      insuranceMonthly: 195,
      maintenanceBase: 105,
    },
    {
      name: "Black Edition",
      price: 49000,
      hp: 280,
      totalMonthly: "$540-$860",
      cityMpg: 18,
      hwyMpg: 24,
      insuranceMonthly: 205,
      maintenanceBase: 110,
    },
  ],

  specs: {
    engine: "3.5L V6 Gasoline",
    transmission: "9-speed automatic",
    drivetrain: "AWD",
    economy: "18 / 24 mpg",
    fuelType: "Gasoline",
    seats: "5",
    passengerVolume: "109.7 cu ft",
    cargoSpace: "5.3-ft bed + in-bed trunk",
    towingCapacity: "Up to 5,000 lbs",
    zeroToSixty: "Around 6.5 sec",
  },
},

{
  id: "toyota-tundra-limited",
  brand: "Toyota",
  model: "Tundra",
  year: 2026,
  categories: ["Truck"],
  image: "https://www.motortrend.com/files/687fbdeafb4403000207bba9/2026toyotatundratrdpro1.jpg",
  badge: "Full-Size Truck",
  rating: 4.7,

  generation: [
    {
      id: "tundra-3rd-gen",
      label: "2022-Present 3rd Gen",
      estimatedYear: 2024,
      image: "https://www.motortrend.com/files/687fbdeafb4403000207bba9/2026toyotatundratrdpro1.jpg",
      unavailableTrims: [],
      specs: {
        engine: "3.4L Twin-Turbo V6 or Hybrid V6",
        transmission: "10-speed automatic",
        drivetrain: "RWD or 4WD",
        economy: "18 / 24 mpg or hybrid estimate",
        fuelType: "Gasoline / Hybrid",
        seats: "5",
        passengerVolume: "CrewMax cabin estimate",
        cargoSpace: "5.5-ft or 6.5-ft bed",
        towingCapacity: "Up to 12,000 lbs",
        zeroToSixty: "Around 5.7 sec hybrid",
      },
    },
    {
      id: "tundra-2nd-gen",
      label: "2007-2021 2nd Gen",
      estimatedYear: 2016,
      
      image: "https://tse3.mm.bing.net/th/id/OIP.nb8V7Z3HmdDO8XjOEGISgwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      unavailableTrims: ["Capstone"],
      specs: {
        engine: "4.6L V8 or 5.7L V8 Gasoline",
        transmission: "6-speed automatic",
        drivetrain: "RWD or 4WD",
        economy: "13 / 18 mpg",
        fuelType: "Gasoline",
        seats: "5-6",
        passengerVolume: "CrewMax cabin estimate",
        cargoSpace: "5.5-ft, 6.5-ft, or 8.1-ft bed",
        towingCapacity: "Up to 10,200 lbs",
        zeroToSixty: "Around 6.7 sec",
      },
    },
    {
      id: "tundra-1st-gen",
      label: "2000-2006 1st Gen",
      estimatedYear: 2004,
      image: "https://bringatrailer.com/wp-content/uploads/2025/08/2005_toyota_tundra_img_7197-25946.jpeg?fit=940%2C626",
      unavailableTrims: ["Platinum", "1794 Edition", "TRD Pro", "Capstone"],
      specs: {
        engine: "3.4L V6, 4.0L V6, or 4.7L V8 Gasoline",
        transmission: "4-speed or 5-speed automatic",
        drivetrain: "RWD or 4WD",
        economy: "14 / 18 mpg",
        fuelType: "Gasoline",
        seats: "5-6",
        passengerVolume: "Double cab estimate",
        cargoSpace: "6.5-ft or 8-ft bed",
        towingCapacity: "Up to 7,100 lbs",
        zeroToSixty: "Around 7.8 sec",
      },
    },
  ],

  trims: [
    {
      name: "SR",
      price: 42000,
      hp: 358,
      totalMonthly: "$470-$750",
      cityMpg: 18,
      hwyMpg: 24,
      insuranceMonthly: 180,
      maintenanceBase: 105,
    },
    {
      name: "SR5",
      price: 47000,
      hp: 389,
      totalMonthly: "$520-$830",
      cityMpg: 18,
      hwyMpg: 24,
      insuranceMonthly: 195,
      maintenanceBase: 110,
    },
    {
      name: "Limited",
      price: 57000,
      hp: 389,
      totalMonthly: "$620-$990",
      cityMpg: 18,
      hwyMpg: 24,
      insuranceMonthly: 225,
      maintenanceBase: 120,
    },
    {
      name: "Platinum",
      price: 65000,
      hp: 389,
      totalMonthly: "$700-$1120",
      cityMpg: 17,
      hwyMpg: 22,
      insuranceMonthly: 250,
      maintenanceBase: 130,
    },
    {
      name: "1794 Edition",
      price: 66000,
      hp: 389,
      totalMonthly: "$710-$1140",
      cityMpg: 17,
      hwyMpg: 22,
      insuranceMonthly: 255,
      maintenanceBase: 130,
    },
    {
      name: "TRD Pro",
      price: 74000,
      hp: 437,
      totalMonthly: "$800-$1280",
      cityMpg: 18,
      hwyMpg: 20,
      insuranceMonthly: 285,
      maintenanceBase: 145,
    },
    {
      name: "Capstone",
      price: 80000,
      hp: 437,
      totalMonthly: "$860-$1380",
      cityMpg: 19,
      hwyMpg: 22,
      insuranceMonthly: 310,
      maintenanceBase: 150,
    },
  ],

  specs: {
    engine: "3.4L Twin-Turbo V6 or Hybrid V6",
    transmission: "10-speed automatic",
    drivetrain: "RWD or 4WD",
    economy: "18 / 24 mpg or hybrid estimate",
    fuelType: "Gasoline / Hybrid",
    seats: "5",
    passengerVolume: "CrewMax cabin estimate",
    cargoSpace: "5.5-ft or 6.5-ft bed",
    towingCapacity: "Up to 12,000 lbs",
    zeroToSixty: "Around 5.7 sec hybrid",
  },
},  


];
// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return "$" + n.toLocaleString();
}
function toNumberOrEmpty(value: string){
  return value == ""?"" : Number(value);
}

const CURRENT_YEAR = 2026;

type Condition = "excellent" | "good" | "fair" | "poor";



interface CostInputs {
  usedYear: number |"";
  mileage: number| "";
  condition: Condition|"";
  milesPerYear: number|"";
  gasPrice: number|"";
  downPayment: number|"";
  loanMonths: number;
}





function calculateCarCost(trim: Trim, inputs: CostInputs) {
  const usedYear = inputs.usedYear === "" ? CURRENT_YEAR : inputs.usedYear;
  const mileage = inputs.mileage === "" ? 0 : inputs.mileage;
  const condition = inputs.condition === "" ? "good" : inputs.condition;
  const milesPerYear = inputs.milesPerYear === "" ? 12000 : inputs.milesPerYear;
  const gasPrice = inputs.gasPrice === "" ? 4.8 : inputs.gasPrice;
  const downPayment = inputs.downPayment === "" ? 3000 : inputs.downPayment;

  const age = Math.max(0, CURRENT_YEAR - usedYear);

  let usedPrice = trim.price;

  usedPrice -= age * 1200;
  usedPrice -= mileage * 0.08;

  const conditionMultiplier: Record<Condition, number> = {
    excellent: 1.05,
    good: 1.0,
    fair: 0.9,
    poor: 0.8,
  };

  usedPrice *= conditionMultiplier[condition];
  usedPrice = Math.max(usedPrice, 1000);

  const cityMpg = trim.cityMpg ?? 28;
  const hwyMpg = trim.hwyMpg ?? 36;
  const averageMpg = (cityMpg + hwyMpg) / 2;

  const gasMonthly = (milesPerYear / 12 / averageMpg) * gasPrice;

  const insuranceMonthly = trim.insuranceMonthly ?? 170;
  const maintenanceMonthly = (trim.maintenanceBase ?? 70) + age * 8;

  const safeLoanMonths = Math.max(inputs.loanMonths, 1);
  const financedAmount = Math.max(usedPrice - downPayment, 0);
  const paymentMonthly = financedAmount / safeLoanMonths;

  const totalMonthly =
    paymentMonthly + gasMonthly + insuranceMonthly + maintenanceMonthly;

  return {
    usedPrice: Math.round(usedPrice),
    paymentMonthly: Math.round(paymentMonthly),
    gasMonthly: Math.round(gasMonthly),
    insuranceMonthly: Math.round(insuranceMonthly),
    maintenanceMonthly: Math.round(maintenanceMonthly),
    totalMonthly: Math.round(totalMonthly),
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={10}
          className={s <= Math.round(rating) ? "text-accent fill-accent" : "text-muted-foreground"}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

const SPEC_ICONS: Record<string, React.ReactNode> = {
  engine: <Zap size={13} />,
  torque: <Gauge size={13} />,
  topSpeed: <ArrowRight size={13} />,
  economy: <Fuel size={13} />,
  weight: <Scale size={13} />,
};

const SPEC_LABELS: Record<string, string> = {
  engine: "Engine",
  transmission: "Transmission",
  drivetrain: "Drivetrain",
  economy: "Economy",
  fuelType: "Fuel Type",
  seats: "Seats",
  passengerVolume: "Cabin Space",
  cargoSpace: "Cargo Space",
  towingCapacity: "Towing Capacity",
  zeroToSixty: "0-60 mph",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function TrimTabs({
  trims,
  selected,
  onChange,
  unavailableTrims = [],
}: {
  trims: Trim[];
  selected: number;
  onChange: (i: number) => void;
  unavailableTrims?: string[];
}) {
  const visibleTrims = trims
    .map((trim, originalIndex) => ({ trim, originalIndex }))
    .filter((item) => !unavailableTrims.includes(item.trim.name));

  return (
    <div className="flex gap-1 flex-wrap">
      {visibleTrims.map(({ trim, originalIndex }) => (
        <button
          key={trim.name}
          onClick={(e) => {
            e.stopPropagation();
            onChange(originalIndex);
          }}
          className={`px-2.5 py-1 text-xs rounded transition-all duration-200 border ${
            selected === originalIndex
              ? "bg-primary/20 border-primary text-primary"
              : "bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          }`}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
        >
          {trim.name}
        </button>
      ))}
    </div>
  );
}

function CarCard({
  car,
  trimIdx,
  onTrimChange,
  inCompare,
  onCompareToggle,
  isFavorite,
  onFavoriteToggle,
  onViewDetails,
  listView,
  costInputs,
}: {
  car: Car;
  trimIdx: number;
  onTrimChange: (i: number) => void;
  inCompare: boolean;
  onCompareToggle: () => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onViewDetails: () => void;
  listView: boolean;
  costInputs: CostInputs;
}) {
  const trim = car.trims[trimIdx];
  const cost = calculateCarCost(trim, costInputs);
  if (listView) {
    return (
      <div
        className="group flex gap-0 border border-border hover:border-primary/40 rounded transition-all duration-300 overflow-hidden bg-card"
        style={{ boxShadow: "0 0 0 0 rgba(14,165,233,0)", transition: "box-shadow 0.3s, border-color 0.3s" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(14,165,233,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        <div className="relative w-56 flex-shrink-0 bg-muted overflow-hidden">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
          {car.badge && (
            <span
              className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-0.5 text-xs"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px" }}
            >
              {car.badge}
            </span>
          )}
          <button
  onClick={(e) => {
    e.stopPropagation();
    onFavoriteToggle();
  }}
  className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
    isFavorite
      ? "bg-red-500/20 border-red-400 text-red-400"
      : "bg-card/80 border-border text-muted-foreground hover:border-red-400 hover:text-red-400 backdrop-blur-sm"
  }`}
>
  <Heart size={15} className={isFavorite ? "fill-current" : ""} />
</button>
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs text-primary tracking-widest uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {car.brand}
                </span>
                <span className="text-border">·</span>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {car.year}
                </span>
              </div>
              <h3
                className="text-foreground font-semibold text-lg leading-tight mb-1"
                style={{ fontFamily: "'Oxanium', sans-serif" }}
              >
                {car.model}
              </h3>
              <Stars rating={car.rating} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Oxanium', sans-serif" }}>
                {fmt(cost.usedPrice)}
              </div>
              <div className="text-xs text-muted-foreground">Estimated Used Price</div>
            </div>
          </div>
          <div className="flex items-center gap-6 my-3">
            {[
  { label: "Total/mo", val: fmt(cost.totalMonthly) },
  { label: "Gas/mo", val: fmt(cost.gasMonthly) },
  { label: "Insurance", val: fmt(cost.insuranceMonthly) },
].map((s) => (
              <div key={s.label}>
                <div
                  className="text-base font-medium text-accent"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.val}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <TrimTabs trims={car.trims} selected={trimIdx} onChange={onTrimChange} />
            <div className="flex gap-2">
              <button
                onClick={onCompareToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded transition-all duration-200 ${
                  inCompare
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
              >
                {inCompare ? <Check size={11} /> : <Plus size={11} />}
                Compare
              </button>
              <button
                onClick={onViewDetails}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded hover:bg-sky-400 transition-colors duration-200"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
              >
                Details <ChevronRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group flex flex-col border border-border hover:border-primary/40 rounded transition-all duration-300 overflow-hidden bg-card"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(14,165,233,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="relative h-44 bg-muted overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {car.badge && (
          <span
            className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-0.5 text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px" }}
          >
            {car.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onCompareToggle(); }}
          className={`absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded border transition-all duration-200 ${
            inCompare
              ? "bg-primary border-primary text-white"
              : "bg-card/80 border-border text-muted-foreground hover:border-primary hover:text-primary backdrop-blur-sm"
          }`}
        >
          {inCompare ? <Check size={12} /> : <Plus size={12} />}
        </button>
        <button
  onClick={(e) => {
    e.stopPropagation();
    onFavoriteToggle();
  }}
  className={`absolute top-3 right-12 w-7 h-7 flex items-center justify-center rounded border transition-all duration-200 ${
    isFavorite
      ? "bg-red-500/20 border-red-400 text-red-400"
      : "bg-card/80 border-border text-muted-foreground hover:border-red-400 hover:text-red-400 backdrop-blur-sm"
  }`}
>
  <Heart size={13} className={isFavorite ? "fill-current" : ""} />
</button>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-xs text-primary tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {car.brand}
            </span>
            <span className="text-border text-xs">·</span>
            <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {car.year}
            </span>
          </div>
          <h3
            className="text-foreground font-semibold leading-tight"
            style={{ fontFamily: "'Oxanium', sans-serif", fontSize: "1.05rem" }}
          >
            {car.model}
          </h3>
          <Stars rating={car.rating} />
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 border-y border-border">
  {[
    { label: "Total/mo", val: fmt(cost.totalMonthly) },
    { label: "Gas/mo", val: fmt(cost.gasMonthly) },
    { label: "Insurance", val: fmt(cost.insuranceMonthly) },
  ].map((s) => (
    <div key={s.label} className="text-center">
      <div
        className="text-sm font-medium text-accent"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {s.val}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
    </div>
  ))}
</div>

<TrimTabs trims={car.trims} selected={trimIdx} onChange={onTrimChange} />

<div className="flex items-center justify-between mt-auto pt-1">
  <div>
    <div className="text-lg font-bold text-foreground" style={{ fontFamily: "'Oxanium', sans-serif" }}>
      {fmt(cost.usedPrice)}
    </div>
    <div className="text-xs text-muted-foreground">Estimated Used Price</div>
  </div>
          </div>
          <button
            onClick={onViewDetails}
            className="flex items-center gap-1.5 px-4 py-2 text-xs bg-primary text-primary-foreground rounded hover:bg-sky-400 transition-colors duration-200"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}
          >
            View <ChevronRight size={11} />
          </button>
        </div>
      </div>

  );
}

function SpecsPanel({
  car,
  trimIdx,
  onTrimChange,
  onClose,
  inCompare,
  onCompareToggle,
  costInputs,
}: {
  car: Car | null;
  trimIdx: number;
  onTrimChange: (i: number) => void;
  onClose: () => void;
  inCompare: boolean;
  onCompareToggle: () => void;
  costInputs : CostInputs;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selectedGenerationId, setSelectedGenerationId] = useState("Previous-gen");

  useEffect(() => {
    if (car) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [car]);

  if (!car) return null;
  const trim = car.trims[trimIdx];
  
  const generations = car.generation ?? [];

  const selectedGeneration = 
    generations.find((gen) => gen.id == selectedGenerationId) ??
    generations[0];
  const displayImage = selectedGeneration?.image ?? car.image;
  const displaySpecs = selectedGeneration?.specs?? car.specs;
  

  const detailCostInputs = selectedGeneration
  ?{
    ...costInputs,
    usedYear: selectedGeneration.estimatedYear,
  }
  : costInputs;
  const cost = calculateCarCost(trim, detailCostInputs);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-stretch justify-end"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-lg bg-card border-l border-border flex flex-col overflow-hidden"
        style={{ animation: "slideInRight 0.3s ease" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <span
              className="text-xs text-primary tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {car.brand}
            </span>
            <h2
              className="text-xl font-bold text-foreground leading-tight"
              style={{ fontFamily: "'Oxanium', sans-serif" }}
            >
              {car.model}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Image */}
        <div className="relative h-52 bg-muted flex-shrink-0 overflow-hidden">
          <img
            src={displayImage}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <TrimTabs trims={car.trims} selected={trimIdx} onChange={onTrimChange} unavailableTrims={selectedGeneration?.unavailableTrims} />
          </div>
        </div>

        {/* Key stats */}
       <div className="grid grid-cols-3 border-b border-border">
  {[
    { label: "Used Price", val: fmt(cost.usedPrice) },
    { label: "Payment/mo", val: fmt(cost.paymentMonthly) },
    { label: "Total/mo", val: fmt(cost.totalMonthly) },
  ].map((s) => (
    <div key={s.label} className="p-4 text-center border-r last:border-r-0 border-border">
      <div
        className="text-lg font-bold text-accent"
        style={{ fontFamily: "'Oxanium', sans-serif" }}
      >
        {s.val}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
    </div>
  ))}
</div>
{/* Generation selector */}
<div className="px-6 py-4 border-b border-border">
  <p
    className="text-xs text-primary tracking-widest uppercase mb-3"
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
  >
    Generation / Year Range
  </p>

  <select
    value={selectedGenerationId}
    onChange={(e) => {
      const nextGenerationId= e.target.value;
      const nextGeneration = generations.find((gen) =>gen.id === nextGenerationId);
      setSelectedGenerationId(nextGenerationId);
      const firstAvailableTrimIndex = car.trims.findIndex(
        (trim) => !nextGeneration?.unavailableTrims?.includes(trim.name)
      );
      onTrimChange(firstAvailableTrimIndex === -1 ? 0 : firstAvailableTrimIndex);
    }}
    className="w-full bg-muted border border-border text-foreground text-sm px-3 py-2 rounded outline-none focus:border-primary/60"
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
  >
    {generations.map((gen) => (
      <option key={gen.id} value={gen.id}>
        {gen.label}
      </option>
    ))}
  </select>

  
</div>

        {/* Full Specs */}
        <div className="flex-1 overflow-y-auto p-6">
          <p
            className="text-xs text-primary tracking-widest uppercase mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Full Specifications
          </p>
          <div className="flex flex-col divide-y divide-border">
            {Object.entries(displaySpecs).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-primary/70">{SPEC_ICONS[key] ?? <SlidersHorizontal size={13} />}</span>
                  <span className="text-sm">{SPEC_LABELS[key] ?? key}</span>
                </div>
                <span
                  className="text-sm text-foreground font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-1 overflow-y-auto p-6">
  <p
    className="text-xs text-primary tracking-widest uppercase mb-4"
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
  >
     Monthly Cost Breakdown 
  </p>

  <div className="flex flex-col divide-y divide-border border border-border rounded overflow-hidden">
    {[
      { label: "Estimated Used Price", value: fmt(cost.usedPrice) },
      { label: "Monthly Payment", value: fmt(cost.paymentMonthly) },
      { label: "Gas Monthly", value: fmt(cost.gasMonthly) },
      { label: "Insurance Monthly", value: fmt(cost.insuranceMonthly) },
      { label: "Maintenance Monthly", value: fmt(cost.maintenanceMonthly) },
      { label: "Total Monthly Cost", value: fmt(cost.totalMonthly) },
    ].map((item) => (
      <div key={item.label} className="flex items-center justify-between px-4 py-3 bg-muted/20">
        <span className="text-sm text-muted-foreground">{item.label}</span>
        <span
          className="text-sm font-bold text-foreground"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {item.value}
        </span>
      </div>
    ))}
  </div>
  <div className="mt-6">
    <p className="text-xs text-primary tracking-widest uppercase mb-4">
      Places to Buy / Sell
    </p>

    <div className="grid grid-cols-2 gap-2">
      {MARKETPLACES.map((site) => (
        <a
          key={site.name}
          href={site.url}
          target="_blank"
          rel="noreferrer"
          className="border border-border rounded px-3 py-2 hover:border-primary/60 transition-colors"
        >
          <div className="text-sm text-foreground font-semibold">{site.name}</div>
          <div className="text-xs text-muted-foreground">{site.type}</div>
        </a>
      ))}
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

function CompareModal({
  cars,
  trims,
  onClose,
  onRemove,
}: {
  cars: Car[];
  trims: Record<string, number>;
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  const specKeys = Object.keys(SPEC_LABELS) as (keyof Car["specs"])[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-5xl bg-card border border-border rounded overflow-hidden flex flex-col max-h-[90vh]"
        style={{ animation: "fadeScaleIn 0.25s ease" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <h2
            className="text-lg font-bold text-foreground flex items-center gap-2"
            style={{ fontFamily: "'Oxanium', sans-serif" }}
          >
            <GitCompare size={18} className="text-primary" />
            Compare Vehicles
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left text-xs text-muted-foreground w-36" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  SPEC
                </th>
                {cars.map((car) => {
                  const t = car.trims[trims[car.id] ?? 0];
                  return (
                    <th key={car.id} className="p-4 text-center border-l border-border relative">
                      <button
                        onClick={() => onRemove(car.id)}
                        className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <X size={12} />
                      </button>
                      <div className="relative h-24 bg-muted rounded overflow-hidden mb-2">
                        <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
                      </div>
                      <div
                        className="text-xs text-primary tracking-wider"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {car.brand}
                      </div>
                      <div
                        className="text-sm font-semibold text-foreground leading-tight"
                        style={{ fontFamily: "'Oxanium', sans-serif" }}
                      >
                        {car.model}
                      </div>
                      <div
                        className="text-xs text-accent mt-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {fmt(t.price)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border bg-muted/30">
                <td className="p-4 text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>HP</td>
                {cars.map((car) => (
                  <td key={car.id} className="p-4 text-center border-l border-border">
                    <span className="text-sm font-bold text-accent" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {car.trims[trims[car.id] ?? 0].hp}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-border">
                <td className="p-4 text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Insurance monthly</td>
                {cars.map((car) => (
                  <td key={car.id} className="p-4 text-center border-l border-border">
                    <span className="text-sm font-bold text-accent" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {car.trims[trims[car.id] ?? 0].totalMonthly}
                    </span>
                  </td>
                ))}
              </tr>
              {specKeys.map((key, i) => (
                <tr key={key} className={`border-b border-border ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                  <td
                    className="p-4 text-xs text-muted-foreground"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {SPEC_LABELS[key]}
                  </td>
                  {cars.map((car) => (
                    <td
                      key={car.id}
                      className="p-4 text-center text-sm text-foreground border-l border-border"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}
                    >
                      {car.specs[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [costInputs, setCostInputs] = useState<CostInputs>({
  usedYear: "",
  mileage: "",
  condition: "",
  milesPerYear: "",
  gasPrice: "",
  downPayment: "",
  loanMonths: 60,
});
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All");
  const [categories, setCategories] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [favouriteIds, setFavouriteIds] = useState<string[]>(() =>{
    return JSON.parse(localStorage.getItem("favouriteCars") || "[]");

  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTrims, setSelectedTrims] = useState<Record<string, number>>({});
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [detailCarId, setDetailCarId] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const getTrimIdx = (id: string) => selectedTrims[id] ?? 0;

  const setTrimIdx = (id: string, i: number) =>
    setSelectedTrims((prev) => ({ ...prev, [id]: i }));

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };
  const toggleFavorite = (id:string) =>{
    setFavouriteIds((prev) => {
      const next = prev.includes(id)
       ? prev.filter((x) => x !== id)
       : [...prev, id];
      localStorage.setItem("favouriteCars", JSON.stringify(next));
      return next; 
    });
  };

  const filtered = useMemo(() => {
    let list = CARS.filter((c) => {
      const q = query.toLowerCase();
      const matchSearch =
        !q ||
        c.model.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.year.toString().includes(q);
      const matchBrand = brand === "All" || c.brand === brand;
      const matchCategories = categories == "All" || c.categories?.includes(categories as any);
      return matchSearch && matchBrand && matchCategories;
    });

    if (sortBy === "price-asc") list = [...list].sort((a, b) => a.trims[0].price - b.trims[0].price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.trims[0].price - a.trims[0].price);
    if (sortBy === "hp") list = [...list].sort((a, b) => b.trims[0].hp - a.trims[0].hp);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [query, brand, categories, sortBy]);

  const detailCar = detailCarId ? CARS.find((c) => c.id === detailCarId) ?? null : null;
  const compareCars = CARS.filter((c) => compareIds.includes(c.id));

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.2); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(14,165,233,0.4); }
      `}</style>

      <div
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* ── NAV ── */}
        <header
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
            scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary flex items-center justify-center rounded-sm">
                <LayoutGrid size={14} className="text-white" />
              </div>
              <span
                className="text-lg font-bold tracking-wider text-foreground"
                style={{ fontFamily: "'Oxanium', sans-serif" }}
              >
                Car<span className="text-primary">Tech</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-7">
              {["Browse", "Compare", "Electric", "New Arrivals"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {l}
                </a>
              ))}
            </nav>
            <button
              className="hidden md:flex items-center gap-2 text-xs border border-primary/50 text-primary px-4 py-1.5 rounded hover:bg-primary/10 transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Sign In
            </button>
          </div>
        </header>

        {/* ── HERO ── */}
        <section className="relative h-[92vh] min-h-[560px] flex items-end overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-background">
            <img
              src="https://images.unsplash.com/photo-1705563666935-4d0a72709948?w=1920&h=1080&fit=crop&fm=png"
              alt="Futuristic car in dark studio"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 pb-16 w-full">
            <div className="max-w-2xl mb-10">
              <p
                className="text-primary text-xs tracking-[0.35em] uppercase mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Next-Gen Automotive Intelligence
              </p>
              <h1
                className="font-bold uppercase text-foreground leading-none mb-5"
                style={{
                  fontFamily: "'Oxanium', sans-serif",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  lineHeight: 1.0,
                }}
              >
                Find Your
                <br />
                <span className="text-primary" style={{ textShadow: "0 0 40px rgba(14,165,233,0.4)" }}>
                  Perfect
                </span>
                <br />
                Machine
              </h1>
              <p className="text-muted-foreground text-base font-light leading-relaxed">
                Browse {CARS.length} elite vehicles. Filter, compare, and configure with precision.
              </p>
            </div>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <div className="flex items-center gap-3 bg-card/80 backdrop-blur border border-border rounded px-4 py-3 focus-within:border-primary/60 transition-colors duration-200">
                <Search size={16} className="text-muted-foreground flex-shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by brand, model, or year..."
                  className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 max-w-xl">
  <input
    type="number"
    value={costInputs.usedYear}
    onChange={(e) =>
      setCostInputs({ ...costInputs, usedYear: toNumberOrEmpty(e.target.value) })
    }
    placeholder="Year"
    className="bg-card/80 border border-border text-foreground text-xs px-3 py-2 rounded outline-none focus:border-primary/60"
  />

  <input
    type="number"
    value={costInputs.mileage}
    onChange={(e) =>
      setCostInputs({ ...costInputs, mileage: toNumberOrEmpty(e.target.value) })
    }
    placeholder="Mileage"
    className="bg-card/80 border border-border text-foreground text-xs px-3 py-2 rounded outline-none focus:border-primary/60"
  />

  <select
    value={costInputs.condition}
    onChange={(e) =>
      setCostInputs({
        ...costInputs,
        condition: e.target.value as Condition | "",
      })
    }
    className="bg-card/80 border border-border text-foreground text-xs px-3 py-2 rounded outline-none focus:border-primary/60"
  > 
    <option value="moreoptions">Choose your condition</option>
    <option value="excellent">Excellent</option>
    <option value="good">Good</option>
    <option value="fair">Fair</option>
    <option value="poor">Poor</option>
  </select>

  <input
    type="number"
    value={costInputs.milesPerYear}
    onChange={(e) =>
      setCostInputs({ ...costInputs, milesPerYear: Number(e.target.value) })
    }
    placeholder="Miles/year"
    className="bg-card/80 border border-border text-foreground text-xs px-3 py-2 rounded outline-none focus:border-primary/60"
  />

  <input
    type="number"
    value={costInputs.gasPrice}
    onChange={(e) =>
      setCostInputs({ ...costInputs, gasPrice: toNumberOrEmpty(e.target.value) })
    }
    placeholder="Gas price"
    className="bg-card/80 border border-border text-foreground text-xs px-3 py-2 rounded outline-none focus:border-primary/60"
  />

  <input
    type="number"
    value={costInputs.downPayment}
    onChange={(e) =>
      setCostInputs({ ...costInputs, downPayment: toNumberOrEmpty(e.target.value) })
    }
    placeholder="Down payment"
    className="bg-card/80 border border-border text-foreground text-xs px-3 py-2 rounded outline-none focus:border-primary/60"
  />
</div>
              {/* Glow */}
              <div
                className="absolute -inset-0.5 rounded pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.1), transparent)", filter: "blur(8px)" }}
              />
            </div>
          </div>
        </section>

        {/* ── BROWSE ── */}
        <section className="max-w-7xl mx-auto px-5 py-10">
          {/* Brand filters */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span
              className="text-xs text-muted-foreground mr-2 flex items-center gap-1.5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <SlidersHorizontal size={12} /> Brand
            </span>
            {BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`px-4 py-1.5 text-xs rounded border transition-all duration-200 ${
                  brand === b
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-6">
  <span
    className="text-xs text-muted-foreground mr-2 flex items-center gap-1.5"
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
  >
    <SlidersHorizontal size={12} /> Category
  </span>

  {CATEGORIES.map((cat) => (
    <button
      key={cat}
      onClick={() => setCategories(cat)}
      className={`px-4 py-1.5 text-xs rounded border transition-all duration-200 ${
        categories === cat
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
      }`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {cat}
    </button>
  ))}
</div>
          {/* Controls row */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <p className="text-sm text-muted-foreground">
              <span
                className="text-foreground font-medium"
                style={{ fontFamily: "'Oxanium', sans-serif" }}
              >
                {filtered.length}
              </span>{" "}
              vehicles found
            </p>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-card border border-border text-foreground text-xs px-3 py-2 pr-7 rounded outline-none focus:border-primary/60 cursor-pointer"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="hp">Horsepower</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
              {/* View toggle */}
              <div className="flex border border-border rounded overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 border-l border-border transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Cars grid / list */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Search size={36} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">No vehicles match your search.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  trimIdx={getTrimIdx(car.id)}
                  onTrimChange={(i) => setTrimIdx(car.id, i)}
                  inCompare={compareIds.includes(car.id)}
                  onCompareToggle={() => toggleCompare(car.id)}
                  isFavorite ={favouriteIds.includes(car.id)}
                  onFavoriteToggle={() => toggleFavorite(car.id)}
                  onViewDetails={() => setDetailCarId(car.id)}
                  listView={false}
                  costInputs={costInputs}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  trimIdx={getTrimIdx(car.id)}
                  onTrimChange={(i) => setTrimIdx(car.id, i)}
                  inCompare={compareIds.includes(car.id)}
                  onCompareToggle={() => toggleCompare(car.id)}
                  isFavorite={favouriteIds.includes(car.id)}
                  onFavoriteToggle={() => toggleFavorite(car.id)}
                  onViewDetails={() => setDetailCarId(car.id)}
                  listView={true}
                  costInputs={costInputs}
                />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-border mt-12 py-8 px-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span
              className="text-sm font-bold text-foreground"
              style={{ fontFamily: "'Oxanium', sans-serif" }}
            >
              Car<span className="text-primary">Tech</span>
            </span>
            <p
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              © 2025 CarTech Automotive Intelligence Platform
            </p>
          </div>
        </footer>
      </div>

      {/* ── SPECS DRAWER ── */}
      {detailCar && (
        <SpecsPanel
          car={detailCar}
          trimIdx={getTrimIdx(detailCar.id)}
          onTrimChange={(i) => setTrimIdx(detailCar.id, i)}
          onClose={() => setDetailCarId(null)}
          inCompare={compareIds.includes(detailCar.id)}
          onCompareToggle={() => toggleCompare(detailCar.id)}
          costInputs={costInputs}
        />
      )}

      {/* ── COMPARE STICKY BAR ── */}
      {compareIds.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border px-5 py-3"
          style={{ animation: "slideUp 0.3s ease", boxShadow: "0 -8px 32px rgba(14,165,233,0.08)" }}
        >
          <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
            <span
              className="text-xs text-muted-foreground flex items-center gap-1.5 mr-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <GitCompare size={12} className="text-primary" />
              Comparing ({compareIds.length}/3)
            </span>
            <div className="flex items-center gap-3 flex-1 min-w-0 flex-wrap">
              {compareCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-2 bg-muted border border-border rounded px-2.5 py-1.5"
                >
                  <img src={car.image} alt={car.model} className="w-8 h-5 object-cover rounded-sm" />
                  <span
                    className="text-xs text-foreground"
                    style={{ fontFamily: "'Oxanium', sans-serif" }}
                  >
                    {car.model}
                  </span>
                  <button
                    onClick={() => toggleCompare(car.id)}
                    className="text-muted-foreground hover:text-foreground ml-0.5"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 ml-auto flex-shrink-0">
              <button
                onClick={() => setCompareIds([])}
                className="text-xs border border-border text-muted-foreground px-3 py-1.5 rounded hover:border-foreground/30 hover:text-foreground transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Clear
              </button>
              <button
                onClick={() => setShowCompare(true)}
                disabled={compareIds.length < 2}
                className="text-xs bg-primary text-primary-foreground px-4 py-1.5 rounded hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <GitCompare size={12} />
                Compare Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPARE MODAL ── */}
      {showCompare && (
        <CompareModal
          cars={compareCars}
          trims={selectedTrims}
          onClose={() => setShowCompare(false)}
          onRemove={(id) => {
            toggleCompare(id);
            if (compareIds.length <= 2) setShowCompare(false);
          }}
        />
      )}
    </>
  );
}
