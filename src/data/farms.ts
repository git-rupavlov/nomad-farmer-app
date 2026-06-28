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
    yields: { food: 5, maintenance: 3, goods: 2, budget: 2, science: 1, culture: 1 },
    tiles: [
      { id: "balcony-1", name: "Tomato Pot", terrain: "container", terrainArchetypeId: "terrain-container", improvement: "trellis", improvementArchetypeId: "improvement-trellis", workedByCitizen: true, yields: { food: 2, maintenance: 1, goods: 1, budget: 1, science: 0, culture: 0 }, sun: 8, soil: 5, waterRetention: 4, pestPressure: 3 },
      { id: "balcony-2", name: "Bean Rail", terrain: "balcony", terrainArchetypeId: "terrain-balcony", improvement: "trellis", improvementArchetypeId: "improvement-trellis", workedByCitizen: true, yields: { food: 1, maintenance: 1, goods: 1, budget: 0, science: 0, culture: 0.5 }, sun: 7, soil: 4, waterRetention: 3, pestPressure: 2 },
      { id: "balcony-3", name: "Seedling Tray", terrain: "greenhouse", terrainArchetypeId: "terrain-greenhouse", improvement: "cold_frame", improvementArchetypeId: "improvement-cold-frame", workedByCitizen: true, yields: { food: 1, maintenance: 1, goods: 0, budget: 0, science: 2, culture: 0 }, sun: 6, soil: 6, waterRetention: 5, pestPressure: 1 },
      { id: "balcony-4", name: "Herb Corner", terrain: "container", terrainArchetypeId: "terrain-container", improvement: "mulch", improvementArchetypeId: "improvement-mulch", workedByCitizen: false, yields: { food: 1, maintenance: 0.5, goods: 0, budget: 1, science: 0, culture: 1 }, sun: 5, soil: 6, waterRetention: 6, pestPressure: 2 }
    ],
    plants: [
      { id: "plant-1", speciesId: "garden-tomato", quantity: 12, stage: "vegetative", health: 72, daysOld: 34, tileId: "balcony-1", origin: "Lidl seedlings", notes: "cherry-type inventory, normalized under garden tomato species" },
      { id: "plant-2", speciesId: "climbing-bean", quantity: 2, stage: "flowering", health: 81, daysOld: 41, tileId: "balcony-2", notes: "white flowers observed" },
      { id: "plant-3", speciesId: "butternut-squash", quantity: 1, stage: "seedling", health: 65, daysOld: 12, tileId: "balcony-3", notes: "butternut / Matilda uncertain cultivar" }
    ],
    buildings: [
      { id: "building-1", buildingId: "small-plastic-greenhouse", quantity: 1, condition: 86, status: "active", tileId: "balcony-3", origin: "Lidl", notes: "vertical greenhouse used for seedlings" },
      { id: "building-2", buildingId: "trellis-network", quantity: 1, condition: 74, status: "active", tileId: "balcony-1", notes: "improvised support for tomatoes and beans" }
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
    yields: { food: 4, maintenance: 6, goods: 3, budget: 1, science: 3, culture: 5 },
    tiles: [
      { id: "field-1", name: "Wild Patch", terrain: "wild_patch", terrainArchetypeId: "terrain-wild-patch", improvement: "mulch", improvementArchetypeId: "improvement-mulch", workedByCitizen: true, yields: { food: 1, maintenance: 2, goods: 1, budget: 0, science: 2, culture: 3 }, sun: 9, soil: 5, waterRetention: 5, pestPressure: 5 },
      { id: "field-2", name: "Squash Test", terrain: "field", terrainArchetypeId: "terrain-field", improvement: "compost_layer", improvementArchetypeId: "improvement-compost-layer", workedByCitizen: true, yields: { food: 2, maintenance: 2, goods: 1, budget: 0, science: 1, culture: 1 }, sun: 8, soil: 6, waterRetention: 6, pestPressure: 4 },
      { id: "field-3", name: "Weed Observatory", terrain: "wild_patch", terrainArchetypeId: "terrain-wild-patch", workedByCitizen: false, yields: { food: 0, maintenance: 2, goods: 1, budget: 1, science: 2, culture: 3 }, sun: 7, soil: 4, waterRetention: 3, pestPressure: 6 }
    ],
    plants: [
      { id: "plant-4", speciesId: "amaranth", quantity: 24, stage: "seedling", health: 58, daysOld: 8, tileId: "field-1", notes: "Red Garnet seed batch" },
      { id: "plant-5", speciesId: "butternut-squash", quantity: 1, stage: "seed", health: 50, daysOld: 2, tileId: "field-2", notes: "forward scout planting" }
    ],
    buildings: [
      { id: "building-3", buildingId: "compost-heat-pit", quantity: 1, condition: 61, status: "active", tileId: "field-2", notes: "buried kitchen waste and weeds for slow soil improvement" },
      { id: "building-4", buildingId: "water-cache", quantity: 1, condition: 90, status: "planned", notes: "field reserve planned near access route" }
    ],
    productionQueue: [
      { id: "task-3", name: "Install Water Cache", description: "Hide emergency water near the field zone.", progress: 2, requiredLabor: 6, reward: "+25 Stored Water", completed: false }
    ]
  }
];
