import type { Yields } from "../domain/types";

export interface ImprovementArchetype {
  id: string;
  name: string;
  civInspiredBy: string;
  description: string;
  yieldChanges: Yields;
  effects: string[];
  unlockTechId?: string;
  tags: string[];
}

export const improvementArchetypes: ImprovementArchetype[] = [
  {
    id: "improvement-trellis",
    name: "Trellis",
    civInspiredBy: "Farm / route support logic",
    description: "Vertical support for tomatoes, beans, squash experiments, and the eternal human urge to tie plants to sticks.",
    yieldChanges: { food: 1, maintenance: -1, goods: 1, budget: 0, science: 0, culture: 0 },
    effects: ["Improves climbing crop control", "Reduces maintenance pressure on vine crops"],
    unlockTechId: "tech-plant-supports",
    tags: ["support", "vertical", "climbing-crops"]
  },
  {
    id: "improvement-mulch",
    name: "Mulch Layer",
    civInspiredBy: "Feature preservation / improvement modifier",
    description: "Organic cover that reduces evaporation and protects soil structure.",
    yieldChanges: { food: 0, maintenance: -0.5, goods: 0, budget: 0, science: 0, culture: 0.5 },
    effects: ["Improves water retention", "Reduces stress on hot days"],
    unlockTechId: "tech-soil-care",
    tags: ["soil", "water", "organic"]
  },
  {
    id: "improvement-drip-irrigation",
    name: "Drip Irrigation",
    civInspiredBy: "Irrigation chain",
    description: "Targeted watering system that makes the farm less dependent on remembering things. Bold technology for humans.",
    yieldChanges: { food: 1, maintenance: -2, goods: 0, budget: -1, science: 0.5, culture: 0 },
    effects: ["Strong water stability", "Reduces routine watering labor"],
    unlockTechId: "tech-irrigation",
    tags: ["water", "automation", "infrastructure"]
  },
  {
    id: "improvement-compost-layer",
    name: "Compost Layer",
    civInspiredBy: "Farm yield improvement",
    description: "Buried or top-dressed organic matter feeding soil life and future crops.",
    yieldChanges: { food: 1, maintenance: -0.5, goods: 1, budget: 0, science: 0.5, culture: 0.5 },
    effects: ["Improves soil over time", "Adds slow nutrient support"],
    unlockTechId: "tech-composting",
    tags: ["soil", "fertility", "organic"]
  },
  {
    id: "improvement-shade-net",
    name: "Shade Net",
    civInspiredBy: "Defensive terrain modifier",
    description: "Heat and sun protection for fragile crops and seedlings during brutal balcony summers.",
    yieldChanges: { food: 0, maintenance: -0.5, goods: 0, budget: 0, science: 0, culture: 0 },
    effects: ["Reduces heat stress", "Can lower light for sun-loving crops"],
    unlockTechId: "tech-climate-control",
    tags: ["protection", "summer", "microclimate"]
  },
  {
    id: "improvement-cold-frame",
    name: "Cold Frame",
    civInspiredBy: "Building-like plot improvement",
    description: "Small protection structure for seedlings and season extension.",
    yieldChanges: { food: 1, maintenance: -0.5, goods: 0, budget: 0, science: 1, culture: 0 },
    effects: ["Protects seedlings", "Extends growing window"],
    unlockTechId: "tech-season-extension",
    tags: ["greenhouse", "seedlings", "protection"]
  }
];

export function getImprovementArchetype(id?: string) {
  if (!id) return undefined;
  return improvementArchetypes.find((improvement) => improvement.id === id);
}
