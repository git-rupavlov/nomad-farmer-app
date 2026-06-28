export interface PlantSpecies {
  id: string;
  commonName: string;
  latinName: string;
  category: "vegetable" | "herb" | "grain" | "legume" | "fruit";
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

export const species: PlantSpecies[] = [
  {
    id: "cherry-tomato",
    commonName: "Cherry Tomato",
    latinName: "Solanum lycopersicum var. cerasiforme",
    category: "vegetable",
    civ: { health: 1, happiness: 2, maintenance: 2 },
    requirements: { water: 4, fertilizer: 4, sun: 7, labor: 3 },
    yields: { water: -3, labor: 2, budget: 3 }
  },
  {
    id: "bean",
    commonName: "Climbing Bean",
    latinName: "Phaseolus vulgaris",
    category: "legume",
    civ: { health: 1, happiness: 1, maintenance: 1 },
    requirements: { water: 3, fertilizer: 2, sun: 6, labor: 2 },
    yields: { water: -2, labor: 2, budget: 2 }
  },
  {
    id: "butternut",
    commonName: "Butternut Squash",
    latinName: "Cucurbita moschata",
    category: "vegetable",
    civ: { health: 2, happiness: 2, maintenance: 3 },
    requirements: { water: 5, fertilizer: 5, sun: 8, labor: 4 },
    yields: { water: -4, labor: 3, budget: 4 }
  },
  {
    id: "amaranth",
    commonName: "Amaranth",
    latinName: "Amaranthus spp.",
    category: "grain",
    civ: { health: 2, happiness: 1, maintenance: 1 },
    requirements: { water: 2, fertilizer: 2, sun: 7, labor: 1 },
    yields: { water: -1, labor: 1, budget: 2 }
  }
];
