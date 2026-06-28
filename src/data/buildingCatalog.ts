import type { Yields } from "../domain/types";
import { cityTaxonomy } from "./taxonomy";

export interface BuildingCatalogItem {
  id: string;
  taxonomy_id: string;
  common_name: string;
  category: "greenhouse" | "irrigation" | "storage" | "compost" | "support" | "sensor" | "monitoring";
  description: string;
  baseEffects: string[];
  yieldModifiers: Yields;
  maintenance: number;
}

const taxonomyBuildings = cityTaxonomy.buildings;

export const buildingCatalog: BuildingCatalogItem[] = [
  {
    id: "small-plastic-greenhouse",
    taxonomy_id: taxonomyBuildings.greenhouse.id,
    common_name: taxonomyBuildings.greenhouse.common_name,
    category: "greenhouse",
    description: "Light protected growing structure for seedlings and season extension.",
    baseEffects: ["Seedlings protected", "+1 Food stability", "+1 Maintenance pressure"],
    yieldModifiers: { food: 1, maintenance: 1, goods: 0, budget: 0, science: 1, culture: 0 },
    maintenance: 1
  },
  {
    id: "trellis-network",
    taxonomy_id: taxonomyBuildings.vine_arc.id,
    common_name: taxonomyBuildings.vine_arc.common_name,
    category: "support",
    description: "Reusable vertical support structure for tomatoes, beans, squash and other climbing crops.",
    baseEffects: ["Improves climbing crop control", "Reduces maintenance pressure on vine crops"],
    yieldModifiers: { food: 1, maintenance: -1, goods: 1, budget: 0, science: 0, culture: 0 },
    maintenance: 0
  },
  {
    id: "compost-heat-pit",
    taxonomy_id: taxonomyBuildings.compost_pit.id,
    common_name: taxonomyBuildings.compost_pit.common_name,
    category: "compost",
    description: "Buried organic matter zone used for soil improvement and unreliable passive heat.",
    baseEffects: ["Improves soil slowly", "May buffer cold", "Requires observation"],
    yieldModifiers: { food: 1, maintenance: 1, goods: 2, budget: 0, science: 1, culture: 1 },
    maintenance: 1
  },
  {
    id: "water-cache",
    taxonomy_id: "water_cache",
    common_name: "water cache",
    category: "storage",
    description: "Stored emergency water for remote or semi-wild locations.",
    baseEffects: ["Improves watering reliability", "Reduces field trip risk"],
    yieldModifiers: { food: 1, maintenance: -1, goods: 1, budget: 0, science: 0, culture: 0 },
    maintenance: 0
  }
];

export function getBuildingCatalogItem(buildingId: string) {
  return buildingCatalog.find((item) => item.id === buildingId);
}

export function formatBuildingName(buildingId: string) {
  const item = getBuildingCatalogItem(buildingId);
  return item?.common_name ?? buildingId;
}
