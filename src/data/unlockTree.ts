export interface UnlockNode {
  id: string;
  name: string;
  civInspiredBy: string;
  description: string;
  unlocked: boolean;
  prerequisites: string[];
  unlocks: string[];
}

export const unlockTree: UnlockNode[] = [
  {
    id: "tech-soil-care",
    name: "Soil Care",
    civInspiredBy: "Agriculture",
    description: "Basic soil cover, moisture protection, and organic matter handling.",
    unlocked: true,
    prerequisites: [],
    unlocks: ["improvement-mulch"]
  },
  {
    id: "tech-plant-supports",
    name: "Plant Supports",
    civInspiredBy: "Construction",
    description: "Trellises, arches, stakes, and other attempts to persuade vines to behave.",
    unlocked: true,
    prerequisites: [],
    unlocks: ["improvement-trellis"]
  },
  {
    id: "tech-composting",
    name: "Composting",
    civInspiredBy: "Biology-lite, minus the expensive laboratory",
    description: "Use organic residues to improve soil fertility and long-term tile quality.",
    unlocked: true,
    prerequisites: ["tech-soil-care"],
    unlocks: ["improvement-compost-layer"]
  },
  {
    id: "tech-season-extension",
    name: "Season Extension",
    civInspiredBy: "Calendar",
    description: "Cold frames, covers, and sheltered propagation for stretching the growing season.",
    unlocked: false,
    prerequisites: ["tech-soil-care"],
    unlocks: ["improvement-cold-frame"]
  },
  {
    id: "tech-irrigation",
    name: "Irrigation",
    civInspiredBy: "Civil Service irrigation chains",
    description: "Reliable watering infrastructure for containers, beds, and field outposts.",
    unlocked: false,
    prerequisites: ["tech-soil-care"],
    unlocks: ["improvement-drip-irrigation"]
  },
  {
    id: "tech-climate-control",
    name: "Microclimate Control",
    civInspiredBy: "Refrigeration / environmental control",
    description: "Shade, airflow, and heat management for fragile balcony and greenhouse crops.",
    unlocked: false,
    prerequisites: ["tech-season-extension"],
    unlocks: ["improvement-shade-net"]
  }
];

export function getUnlockNode(id?: string) {
  if (!id) return undefined;
  return unlockTree.find((node) => node.id === id);
}
