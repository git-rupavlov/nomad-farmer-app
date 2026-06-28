import type { FarmTile, PlantInventoryItem, Yields } from "../domain/types";
import { cityYieldDefinitions } from "../data/cityYields";
import { getBuildingCatalogItem } from "../data/buildingCatalog";
import { getImprovementArchetype } from "../data/improvementArchetypes";
import { formatSpeciesName } from "../data/species";
import { getTerrainArchetype } from "../data/terrainArchetypes";
import { unlockTree } from "../data/unlockTree";
import { summarizePlantInventory } from "../domain/inventory";
import { useGameStore } from "../store/useGameStore";

export function FarmCityScreen() {
  const farm = useGameStore((state) => state.getSelectedFarm());
  const closeFarm = useGameStore((state) => state.closeFarm);
  const workTask = useGameStore((state) => state.workTask);
  const toggleTile = useGameStore((state) => state.toggleTile);
  const nextTurn = useGameStore((state) => state.nextTurn);

  if (!farm) return null;

  const plantSummary = summarizePlantInventory(farm.plantInventory);

  return (
    <section className="city-screen">
      <header className="city-header panel">
        <button onClick={closeFarm}>← World Map</button>
        <div>
          <h1>{farm.name}</h1>
          <p>{farm.subtitle}</p>
        </div>
        <div className="turn-actions">
          <button onClick={nextTurn}>End Turn</button>
        </div>
      </header>

      <div className="city-layout">
        <aside className="city-left panel">
          <h2>City Yields</h2>
          <YieldGrid yields={farm.yields} />

          <h2>Plant Ledger</h2>
          <p className="small">Total: {plantSummary.totalPlants} | Active: {plantSummary.activePlants} | Species: {plantSummary.speciesCount}</p>
          <p className="small">Flowering: {plantSummary.floweringPlants} | Fruiting: {plantSummary.fruitingPlants} | Stressed: {plantSummary.stressedPlants}</p>

          <h2>Vitals</h2>
          <Meter label="Stored Water" value={farm.storedWater} />
          <Meter label="Fertilizer" value={farm.fertilizer} />
          <Meter label="Health" value={farm.health * 10} />
          <Meter label="Happiness" value={farm.happiness * 10} />
          <p className="small">Maintenance pressure: {farm.yields.maintenance} | Budget spent: {farm.budgetSpent} лв</p>

          <h2>Unlock Tree</h2>
          <div className="unlock-list">
            {unlockTree.map((node) => (
              <article key={node.id} className={`unlock-node ${node.unlocked ? "unlocked" : "locked"}`}>
                <strong>{node.name}</strong>
                <span>{node.unlocked ? "Unlocked" : "Locked"}</span>
              </article>
            ))}
          </div>
        </aside>

        <main className="city-center panel">
          <h2>Citizen Tile Management</h2>
          <div className="tile-grid">
            {farm.tiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} onClick={() => toggleTile(farm.id, tile.id)} />
            ))}
          </div>

          <h2>Exact Plant Inventory</h2>
          <div className="plant-inventory-table">
            <div className="plant-inventory-head">
              <span>Qty</span>
              <span>Plant</span>
              <span>Stage</span>
              <span>Health</span>
              <span>Tile</span>
              <span>Status</span>
            </div>
            {farm.plantInventory.map((plant) => <PlantInventoryRow key={plant.id} plant={plant} />)}
          </div>
        </main>

        <aside className="city-right panel">
          <h2>Production Queue</h2>
          {farm.productionQueue.map((task) => (
            <article key={task.id} className={`task-card ${task.completed ? "completed" : ""}`}>
              <strong>{task.name}</strong>
              <p>{task.description}</p>
              <Meter label="Progress" value={(task.progress / task.requiredLabor) * 100} />
              <button disabled={task.completed} onClick={() => workTask(farm.id, task.id)}>
                {task.completed ? "Completed" : "Apply Work"}
              </button>
              <small>{task.reward}</small>
            </article>
          ))}

          <h2>Buildings Inventory</h2>
          {farm.buildings.map((building) => {
            const catalogItem = getBuildingCatalogItem(building.buildingId);
            return (
              <article key={building.id} className="building-card">
                <strong>{building.quantity} × {catalogItem?.common_name ?? building.buildingId}</strong>
                <span>{catalogItem?.category ?? "unknown"} | {building.status} | condition {building.condition}%</span>
                {catalogItem ? <p>{catalogItem.description}</p> : null}
                {building.notes ? <p>{building.notes}</p> : null}
                {catalogItem ? <ul>{catalogItem.baseEffects.map((effect) => <li key={effect}>{effect}</li>)}</ul> : null}
              </article>
            );
          })}
        </aside>
      </div>
    </section>
  );
}

function PlantInventoryRow({ plant }: { plant: PlantInventoryItem }) {
  return (
    <article className={`plant-inventory-row status-${plant.status}`}>
      <span>{plant.quantity}</span>
      <span>
        <strong>{formatSpeciesName(plant.speciesId)}</strong>
        <small>{plant.cultivar ? `Cultivar: ${plant.cultivar}` : "Cultivar: unknown"}</small>
        {plant.notes ? <small>{plant.notes}</small> : null}
      </span>
      <span>{plant.stage}</span>
      <span>{plant.health}%</span>
      <span>{plant.tileId}<small>{plant.container}</small></span>
      <span>{plant.status}<small>{formatObservedFlags(plant)}</small></span>
    </article>
  );
}

function YieldGrid({ yields }: { yields: Yields }) {
  return (
    <div className="yield-grid">
      {cityYieldDefinitions.map((definition) => (
        <Yield
          key={definition.key}
          label={definition.label}
          icon={definition.icon}
          value={yields[definition.key]}
        />
      ))}
    </div>
  );
}

function Yield({ label, icon, value }: { label: string; icon: string; value: number }) {
  return <div className="yield-row"><span>{icon}</span><strong>{value}</strong><em>{label}</em></div>;
}

function Meter({ label, value }: { label: string; value: number }) {
  const bounded = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="meter">
      <div className="meter-label"><span>{label}</span><span>{bounded}%</span></div>
      <div className="meter-track"><div className="meter-fill" style={{ width: `${bounded}%` }} /></div>
    </div>
  );
}

function TileCard({ tile, onClick }: { tile: FarmTile; onClick: () => void }) {
  const terrain = getTerrainArchetype(tile.terrainArchetypeId);
  const improvement = getImprovementArchetype(tile.improvementArchetypeId);
  const combinedYields: Yields = {
    food: (terrain?.baseYields.food ?? 0) + (improvement?.yieldChanges.food ?? 0),
    maintenance: (terrain?.baseYields.maintenance ?? 0) + (improvement?.yieldChanges.maintenance ?? 0),
    goods: (terrain?.baseYields.goods ?? 0) + (improvement?.yieldChanges.goods ?? 0),
    budget: (terrain?.baseYields.budget ?? 0) + (improvement?.yieldChanges.budget ?? 0),
    science: (terrain?.baseYields.science ?? 0) + (improvement?.yieldChanges.science ?? 0),
    culture: (terrain?.baseYields.culture ?? 0) + (improvement?.yieldChanges.culture ?? 0),
  };

  return (
    <button className={`tile-card ${tile.workedByCitizen ? "worked" : "idle"}`} onClick={onClick}>
      <strong>{tile.name}</strong>
      <span className="tile-subtitle">{terrain?.name ?? tile.terrain}</span>
      <small>Tile: {formatYieldSummary(tile.yields)}</small>
      <small>Archetype base: {formatYieldSummary(combinedYields)}</small>
      {improvement ? <small>Improvement: {improvement.name}</small> : <small>No improvement</small>}
      <small>{terrain?.civInspiredBy}</small>
      <small>Sun {tile.sun} | Soil {tile.soil} | Water {tile.waterRetention} | Pests {tile.pestPressure}</small>
      <p className="tile-description">{terrain?.description}</p>
      {improvement ? <p className="tile-description">{improvement.description}</p> : null}
    </button>
  );
}

function formatYieldSummary(yields: Yields) {
  return cityYieldDefinitions.map((definition) => `${definition.icon} ${yields[definition.key]}`).join(" ");
}

function formatObservedFlags(plant: PlantInventoryItem) {
  const flags = [
    plant.observed.flowering ? "flowering" : undefined,
    plant.observed.fruiting ? "fruiting" : undefined,
    plant.observed.pests ? "pests" : undefined,
    plant.observed.disease ? "disease" : undefined
  ].filter(Boolean);
  return flags.length ? flags.join(", ") : "no flags";
}
