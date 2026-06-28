export type CityYieldKey = "food" | "maintenance" | "goods" | "budget" | "science" | "culture";

export interface CityYields {
  food: number;
  maintenance: number;
  goods: number;
  budget: number;
  science: number;
  culture: number;
}

export interface CityYieldDefinition {
  key: CityYieldKey;
  label: string;
  icon: string;
  description: string;
}

export const emptyCityYields: CityYields = {
  food: 0,
  maintenance: 0,
  goods: 0,
  budget: 0,
  science: 0,
  culture: 0
};

export const cityYieldDefinitions: CityYieldDefinition[] = [
  { key: "food", label: "Food", icon: "🍅", description: "Plant production and edible biomass." },
  { key: "maintenance", label: "Maintenance", icon: "🔧", description: "Required work to keep the location operational. Higher is worse." },
  { key: "goods", label: "Goods", icon: "📦", description: "Physical inventory, harvest, compost, wood, seeds and equipment." },
  { key: "budget", label: "Budget", icon: "🪙", description: "Money spent or earned." },
  { key: "science", label: "Science", icon: "🔬", description: "Knowledge from observations, experiments, sensors and records." },
  { key: "culture", label: "Culture", icon: "🌻", description: "Biodiversity, aesthetics and ecosystem value." }
];

export function addCityYields(a: CityYields, b: CityYields): CityYields {
  return {
    food: a.food + b.food,
    maintenance: a.maintenance + b.maintenance,
    goods: a.goods + b.goods,
    budget: a.budget + b.budget,
    science: a.science + b.science,
    culture: a.culture + b.culture
  };
}
