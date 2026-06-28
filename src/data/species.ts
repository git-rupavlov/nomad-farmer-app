import { cityTaxonomy, formatTaxonomyName } from "./taxonomy";

export interface PlantSpecies {
  id: string;
  taxonomy_id: string;
  common_name: string;
  latin_name: string;
  category: "vegetable" | "herb" | "grain" | "legume" | "fruit" | "weed" | "flower" | "fruit_tree" | "berry_bush";
  civ: {
    health: number;
    happiness: number;
    maintenance: number;
  };
  requirements: {
    water: number;
    fertilizer: number;
    sun: number;
    labor: number;
  };
  yields: {
    water: number;
    labor: number;
    budget: number;
  };
}

const taxonomyPlants = cityTaxonomy.plants;

export const species: PlantSpecies[] = [
  {
    id: "garden-tomato",
    taxonomy_id: taxonomyPlants.vegetables.garden_tomato.id,
    common_name: taxonomyPlants.vegetables.garden_tomato.common_name,
    latin_name: taxonomyPlants.vegetables.garden_tomato.latin_name,
    category: "vegetable",
    civ: { health: 1, happiness: 2, maintenance: 2 },
    requirements: { water: 4, fertilizer: 4, sun: 7, labor: 3 },
    yields: { water: -3, labor: 2, budget: 3 }
  },
  {
    id: "climbing-bean",
    taxonomy_id: taxonomyPlants.weeds.wild_bean.id,
    common_name: taxonomyPlants.weeds.wild_bean.common_name,
    latin_name: taxonomyPlants.weeds.wild_bean.latin_name,
    category: "weed",
    civ: { health: 1, happiness: 1, maintenance: 1 },
    requirements: { water: 3, fertilizer: 2, sun: 6, labor: 2 },
    yields: { water: -2, labor: 2, budget: 2 }
  },
  {
    id: "butternut-squash",
    taxonomy_id: taxonomyPlants.vegetables.squash.id,
    common_name: taxonomyPlants.vegetables.squash.common_name,
    latin_name: taxonomyPlants.vegetables.squash.latin_name,
    category: "vegetable",
    civ: { health: 2, happiness: 2, maintenance: 3 },
    requirements: { water: 5, fertilizer: 5, sun: 8, labor: 4 },
    yields: { water: -4, labor: 3, budget: 4 }
  },
  {
    id: "amaranth",
    taxonomy_id: "amaranth",
    common_name: "amaranth",
    latin_name: "Amaranthus spp.",
    category: "grain",
    civ: { health: 2, happiness: 1, maintenance: 1 },
    requirements: { water: 2, fertilizer: 2, sun: 7, labor: 1 },
    yields: { water: -1, labor: 1, budget: 2 }
  }
];

export function getSpecies(speciesId: string) {
  return species.find((entry) => entry.id === speciesId);
}

export function formatSpeciesName(speciesId: string) {
  const entry = getSpecies(speciesId);
  if (!entry) return speciesId;
  return formatTaxonomyName(entry);
}
