import type { Yields } from "../domain/types";

export interface BuildingCatalogItem {
  id: string;
  common_name: string;
  category: "greenhouse" | "irrigation" | "storage" | "compost" | "support" | "sensor";
  description: string;
  baseEffects: string[];
  yieldModifiers: Yields;
  maintenance: number;
}

export const buildingCatalog: BuildingCatalogItem[] = [
  {
    id: "small-plastic-greenhouse",
    common_name: "small plastic greenhouse",
    category: "greenhouse",
    description: "Light protected growing structure for seedlings and season extension.",
    baseEffects: ["Seedlings protected", "+1 Health", "+1 Maintenance"],
    yieldModifiers: { water: 1, labor: 0, budget: 0 },
    maintenance: 1
  },
  {
    id: "trellis-network",
    common_name: "trellis network",
    category: "support",
    description: "Reusable vertical support structure for tomatoes, beans, squash and other climbing crops.",
    baseEffects: ["Improves climbing crop control", "+2 Labor value on supported tiles"],
    yieldModifiers: { water: 0, labor: 2, budget: 0 },
    maintenance: 0
  },
  {
    id: "compost-heat-pit",
    common_name: "compost heat pit",
    category: "compost",
    description: "Buried organic matter zone used for soil improvement and unreliable passive heat.",
    baseEffects: ["Improves soil slowly", "May buffer cold", "Requires observation"],
    yieldModifiers: { water: 1, labor: 1, budget: 0 },
    maintenance: 1
  },
  {
    id: "water-cache",
    common_name: "water cache",
    category: "storage",
    description: "Stored emergency water for remote or semi-wild locations.",
    baseEffects: ["Improves watering reliability", "Reduces field trip risk"],
    yieldModifiers: { water: 2, labor: 0, budget: 0 },
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
