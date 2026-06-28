import type { Farm } from "../domain/types";

export const initialFarms: Farm[] = [
  {
    id: "sofia-balcony",
    name: "Sofia Balcony",
    subtitle: "South-east balcony micro-empire",
    mapX: 34,
    mapY: 42,
    health: 5,
    happiness: 6,
    maintenance: 2,
    storedWater: 62,
    fertilizer: 38,
    budgetSpent: 147,
    yields: { water: 7, labor: 4, budget: 2 },
    tiles: [
      { id: "balcony-1", name: "Tomato Pot", terrain: "container", terrainArchetypeId: "terrain-container", improvement: "trellis", improvementArchetypeId: "improvement-trellis", workedByCitizen: true, yields: { water: 2, labor: 1, budget: 1 }, sun: 8, soil: 5, waterRetention: 4, pestPressure: 3 },
      { id: "balcony-2", name: "Bean Rail", terrain: "balcony", terrainArchetypeId: "terrain-balcony", improvement: "trellis", improvementArchetypeId: "improvement-trellis", workedByCitizen: true, yields: { water: 1, labor: 2, budget: 0 }, sun: 7, soil: 4, waterRetention: 3, pestPressure: 2 },
      { id: "balcony-3", name: "Seedling Tray", terrain: "greenhouse", terrainArchetypeId: "terrain-greenhouse", improvement: "cold_frame", improvementArchetypeId: "improvement-cold-frame", workedByCitizen: true, yields: { water: 2, labor: 1, budget: 0 }, sun: 6, soil: 6, waterRetention: 5, pestPressure: 1 },
      { id: "balcony-4", name: "Herb Corner", terrain: "container", terrainArchetypeId: "terrain-container", improvement: "mulch", improvementArchetypeId: "improvement-mulch", workedByCitizen: false, yields: { water: 1, labor: 0, budget: 1 }, sun: 5, soil: 6, waterRetention: 6, pestPressure: 2 }
    ],
    plants: [
      { id: "plant-1", speciesId: "cherry-tomato", name: "Lidl Cherry Tomato Army", stage: "vegetative", health: 72, daysOld: 34, tileId: "balcony-1" },
      { id: "plant-2", speciesId: "bean", name: "White Flower Beans", stage: "flowering", health: 81, daysOld: 41, tileId: "balcony-2" },
      { id: "plant-3", speciesId: "butternut", name: "Butternut / Matilda Mystery", stage: "seedling", health: 65, daysOld: 12, tileId: "balcony-3" }
    ],
    buildings: [
      { id: "b1", name: "Lidl Greenhouse", type: "greenhouse", effects: ["+1 Health", "Seedlings protected", "+1 Maintenance"] },
      { id: "b2", name: "Improvised Trellis", type: "support", effects: ["+2 Labor yield from climbing crops"] }
    ],
    productionQueue: [
      { id: "task-1", name: "Build 60 cm Tomato Arches", description: "Low arches for cherry tomatoes and squash chaos containment.", progress: 1, requiredLabor: 5, reward: "Adds Trellis Network building", completed: false },
      { id: "task-2", name: "Mix Weak Liquid Feed", description: "Half-dose tomato fertilizer recovery protocol.", progress: 0, requiredLabor: 3, reward: "+15 Fertilizer", completed: false }
    ]
  },
  {
    id: "vurtopo-field",
    name: "Vurtopo Outpost",
    subtitle: "Experimental wild farm zone",
    mapX: 61,
    mapY: 55,
    health: 4,
    happiness: 8,
    maintenance: 4,
    storedWater: 41,
    fertilizer: 22,
    budgetSpent: 38,
    yields: { water: 4, labor: 6, budget: 1 },
    tiles: [
      { id: "field-1", name: "Wild Patch", terrain: "wild_patch", terrainArchetypeId: "terrain-wild-patch", improvement: "mulch", improvementArchetypeId: "improvement-mulch", workedByCitizen: true, yields: { water: 1, labor: 2, budget: 0 }, sun: 9, soil: 5, waterRetention: 5, pestPressure: 5 },
      { id: "field-2", name: "Squash Test", terrain: "field", terrainArchetypeId: "terrain-field", improvement: "compost_layer", improvementArchetypeId: "improvement-compost-layer", workedByCitizen: true, yields: { water: 2, labor: 2, budget: 0 }, sun: 8, soil: 6, waterRetention: 6, pestPressure: 4 },
      { id: "field-3", name: "Weed Observatory", terrain: "wild_patch", terrainArchetypeId: "terrain-wild-patch", workedByCitizen: false, yields: { water: 0, labor: 1, budget: 1 }, sun: 7, soil: 4, waterRetention: 3, pestPressure: 6 }
    ],
    plants: [
      { id: "plant-4", speciesId: "amaranth", name: "Red Garnet Amaranth", stage: "seedling", health: 58, daysOld: 8, tileId: "field-1" },
      { id: "plant-5", speciesId: "butternut", name: "Cigulka Forward Scout", stage: "seed", health: 50, daysOld: 2, tileId: "field-2" }
    ],
    buildings: [
      { id: "b3", name: "Buried Kitchen Waste Heat Pit", type: "compost", effects: ["+1 Soil", "Unreliable heat", "Human optimism detected"] }
    ],
    productionQueue: [
      { id: "task-3", name: "Install Water Cache", description: "Hide emergency water near the field zone.", progress: 2, requiredLabor: 6, reward: "+25 Stored Water", completed: false }
    ]
  }
];
