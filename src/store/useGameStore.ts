import { create } from "zustand";
import { emptyCityYields } from "../data/cityYields";
import { initialFarms } from "../data/farms";
import type { Farm } from "../domain/types";

interface GameState {
  farms: Farm[];
  selectedFarmId: string | null;
  turn: number;
  log: string[];
  selectFarm: (farmId: string) => void;
  closeFarm: () => void;
  getSelectedFarm: () => Farm | undefined;
  workTask: (farmId: string, taskId: string) => void;
  toggleTile: (farmId: string, tileId: string) => void;
  nextTurn: () => void;
}

const cloneFarms = () => structuredClone(initialFarms);

export const useGameStore = create<GameState>((set, get) => ({
  farms: cloneFarms(),
  selectedFarmId: null,
  turn: 1,
  log: ["Nomad Farmer initialized. The empire of dirt begins."],

  selectFarm: (farmId) => set({ selectedFarmId: farmId }),
  closeFarm: () => set({ selectedFarmId: null }),

  getSelectedFarm: () => {
    const { farms, selectedFarmId } = get();
    return farms.find((farm) => farm.id === selectedFarmId);
  },

  toggleTile: (farmId, tileId) => set((state) => ({
    farms: state.farms.map((farm) => farm.id !== farmId ? farm : {
      ...farm,
      tiles: farm.tiles.map((tile) => tile.id === tileId ? { ...tile, workedByCitizen: !tile.workedByCitizen } : tile)
    })
  })),

  workTask: (farmId, taskId) => set((state) => {
    const messages: string[] = [];
    const farms = state.farms.map((farm) => {
      if (farm.id !== farmId) return farm;
      const availableWork = Math.max(1, farm.yields.goods - farm.yields.maintenance + 2);
      const nextQueue = farm.productionQueue.map((task) => {
        if (task.id !== taskId || task.completed) return task;
        const progress = Math.min(task.requiredLabor, task.progress + availableWork);
        const completed = progress >= task.requiredLabor;
        if (completed) messages.push(`${farm.name}: completed ${task.name}. ${task.reward}`);
        return { ...task, progress, completed };
      });
      return { ...farm, productionQueue: nextQueue };
    });
    return { farms, log: [...messages, ...state.log].slice(0, 8) };
  }),

  nextTurn: () => set((state) => {
    const messages: string[] = [];
    const farms = state.farms.map((farm) => {
      const workedTiles = farm.tiles.filter((tile) => tile.workedByCitizen);
      const yields = workedTiles.reduce(
        (sum, tile) => ({
          food: sum.food + tile.yields.food,
          maintenance: sum.maintenance + tile.yields.maintenance,
          goods: sum.goods + tile.yields.goods,
          budget: sum.budget + tile.yields.budget,
          science: sum.science + tile.yields.science,
          culture: sum.culture + tile.yields.culture,
        }),
        { ...emptyCityYields }
      );

      const storedWater = Math.max(0, Math.min(100, farm.storedWater + yields.food - farm.plants.length * 3));
      const fertilizer = Math.max(0, Math.min(100, farm.fertilizer - farm.plants.length));
      const stress = storedWater < 20 || fertilizer < 10 ? 8 : 0;
      const maintenanceStress = Math.max(0, yields.maintenance - yields.goods);

      const plants = farm.plants.map((plant) => ({
        ...plant,
        daysOld: plant.daysOld + 1,
        health: Math.max(0, Math.min(100, plant.health + farm.health - farm.maintenance - stress - maintenanceStress)),
        stage: advanceStage(plant.stage, plant.daysOld + 1)
      }));

      if (stress) messages.push(`${farm.name}: resource stress is hurting plants.`);
      if (maintenanceStress > 0) messages.push(`${farm.name}: maintenance pressure is rising.`);

      return {
        ...farm,
        yields,
        storedWater,
        fertilizer,
        budgetSpent: farm.budgetSpent + Math.max(0, -yields.budget),
        plants
      };
    });

    return {
      farms,
      turn: state.turn + 1,
      log: [`Turn ${state.turn + 1}: gardens updated.`, ...messages, ...state.log].slice(0, 8)
    };
  })
}));

function advanceStage(stage: Farm["plants"][number]["stage"], daysOld: number) {
  if (daysOld > 70) return "harvest";
  if (daysOld > 50) return "fruiting";
  if (daysOld > 35) return "flowering";
  if (daysOld > 14) return "vegetative";
  if (daysOld > 4) return "seedling";
  return stage;
}
