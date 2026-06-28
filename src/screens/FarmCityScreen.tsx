import type { FarmTile } from "../domain/types";
import { getImprovementArchetype } from "../data/improvementArchetypes";
import { getTerrainArchetype } from "../data/terrainArchetypes";
import { unlockTree } from "../data/unlockTree";
import { useGameStore } from "../store/useGameStore";

export function FarmCityScreen() {
  const farm = useGameStore((state) => state.getSelectedFarm());
  const closeFarm = useGameStore((state) => state.closeFarm);
  const workTask = useGameStore((state) => state.workTask);
  const toggleTile = useGameStore((state) => state.toggleTile);
  const nextTurn = useGameStore((state) => state.nextTurn);

  if (!farm) return null;

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
          <Yield label="Water / Fertilizer" icon="🥖" value={farm.yields.water} />
          <Yield label="Labor / Structures" icon="⚒" value={farm.yields.labor} />
          <Yield label="Budget / Commerce" icon="🪙" value={farm.yields.budget} />

          <h2>Vitals</h2>
          <Meter label="Stored Water" value={farm.storedWater} />
          <Meter label="Fertilizer" value={farm.fertilizer} />
          <Meter label="Health" value={farm.health * 10} />
          <Meter label="Happiness" value={farm.happiness * 10} />
          <p className="small">Maintenance: {farm.maintenance} | Budget spent: {farm.budgetSpent} лв</p>

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

          <h2>Plants</h2>
          <div className="plant-list">
            {farm.plants.map((plant) => (
              <article key={plant.id} className="plant-card">
                <strong>{plant.name}</strong>
                <span>{plant.stage} | {plant.daysOld} days | health {plant.health}</span>
              </article>
            ))}
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
                {task.completed ? "Completed" : "Apply Labor"}
              </button>
              <small>{task.reward}</small>
            </article>
          ))}

          <h2>Buildings</h2>
          {farm.buildings.map((building) => (
            <article key={building.id} className="building-card">
              <strong>{building.name}</strong>
              <span>{building.type}</span>
              <ul>{building.effects.map((effect) => <li key={effect}>{effect}</li>)}</ul>
            </article>
          ))}
        </aside>
      </div>
    </section>
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
  const combinedYields = {
    water: (terrain?.baseYields.water ?? 0) + (improvement?.yieldChanges.water ?? 0),
    labor: (terrain?.baseYields.labor ?? 0) + (improvement?.yieldChanges.labor ?? 0),
    budget: (terrain?.baseYields.budget ?? 0) + (improvement?.yieldChanges.budget ?? 0),
  };

  return (
    <button className={`tile-card ${tile.workedByCitizen ? "worked" : "idle"}`} onClick={onClick}>
      <strong>{tile.name}</strong>
      <span className="tile-subtitle">{terrain?.name ?? tile.terrain}</span>
      <span>🥖 {tile.yields.water} ⚒ {tile.yields.labor} 🪙 {tile.yields.budget}</span>
      <small>Archetype base: 🥖 {combinedYields.water} ⚒ {combinedYields.labor} 🪙 {combinedYields.budget}</small>
      {improvement ? <small>Improvement: {improvement.name}</small> : <small>No improvement</small>}
      <small>{terrain?.civInspiredBy}</small>
      <small>Sun {tile.sun} | Soil {tile.soil} | Water {tile.waterRetention} | Pests {tile.pestPressure}</small>
      <p className="tile-description">{terrain?.description}</p>
      {improvement ? <p className="tile-description">{improvement.description}</p> : null}
    </button>
  );
}
