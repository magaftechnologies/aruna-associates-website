import { images } from "./content";

export type Project = {
  id: string;
  name: string;
  category: "Residential Construction" | "Interiors" | "Construction & Interiors";
  location: string;
  year: string;
  description: string;
  images: string[];
};

export const projects: Project[] = [
  { id: "villa-hyd", name: "Modern Independent Villa", category: "Residential Construction", location: "Hyderabad", year: "2024", description: "A two-storey independent villa with warm timber detailing, deep balconies and landscaped frontage.", images: [images.heroHome, images.heroInterior, images.dining] },
  { id: "family-malkajgiri", name: "Contemporary Family Home", category: "Residential Construction", location: "Malkajgiri", year: "2024", description: "Clean white volumes, stone cladding and timber louvers for a growing family.", images: [images.familyHome, images.kitchen] },
  { id: "villa-kompally", name: "Premium Residential Villa", category: "Residential Construction", location: "Kompally", year: "2023", description: "A three-level residence with cantilevered glass balconies set among palms.", images: [images.villaTall, images.bedroom] },
  { id: "urban-medchal", name: "Urban Family Residence", category: "Construction & Interiors", location: "Medchal", year: "2023", description: "Structure through to finishing — a compact urban home planned for everyday living.", images: [images.heroConstruction, images.planning, images.familyHome] },
  { id: "interior-hyd", name: "Contemporary Interior Residence", category: "Interiors", location: "Hyderabad", year: "2024", description: "Ivory walls, walnut panelling and brass accents for a calm, layered living room.", images: [images.heroInterior, images.dining] },
  { id: "3bhk", name: "Elegant 3BHK Interior", category: "Interiors", location: "Hyderabad", year: "2023", description: "A warm 3BHK with a cane-and-teak dining room and soft, natural light.", images: [images.dining, images.bedroom] },
  { id: "kitchen", name: "Modern Kitchen & Living", category: "Interiors", location: "Secunderabad", year: "2024", description: "Matte charcoal and oak cabinetry with a quartz island and brass pendants.", images: [images.kitchen, images.heroInterior] },
  { id: "transform", name: "Complete Home Transformation", category: "Construction & Interiors", location: "Hyderabad", year: "2022", description: "A full refresh — from structural updates to bedroom and kitchen interiors.", images: [images.bedroom, images.kitchen, images.dining] },
];

export const interiorProjects = projects.filter((p) => p.category !== "Residential Construction");
