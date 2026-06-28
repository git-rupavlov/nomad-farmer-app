import { useGameStore } from "../store/useGameStore";

export function MapScreen() {
  const farms = useGameStore((state) => state.farms);
  const turn = useGameStore((state) => state.turn);
  const log = useGameStore((state) => state.log);
  const selectFarm = useGameStore((state) => state.selectFarm);
  const nextTurn = useGameStore((state) => state.nextTurn);

  return (
    <section className="map-screen">
      <header className="top-bar panel">
        <div>
          <h1>Nomad Farmer</h1>
          <p>Civilization IV-inspired plant management demo</p>
        </div>
        <div className="turn-box">
          <strong>Turn {turn}</strong>
          <button onClick={nextTurn}>End Turn</button>
        </div>
      </header>

      <main className="world-map">
        <div className="map-texture" />
        {farms.map((farm) => (
          <button
            key={farm.id}
            className="farm-marker"
            style={{ left: `${farm.mapX}%`, top: `${farm.mapY}%` }}
            onClick={() => selectFarm(farm.id)}
          >
            <span className="city-dot" />
            <span className="farm-name">{farm.name}</span>
            <span className="farm-yields">🍅 {farm.yields.food} 🔧 {farm.yields.maintenance} 📦 {farm.yields.goods} 🪙 {farm.yields.budget} 🔬 {farm.yields.science} 🌻 {farm.yields.culture}</span>
          </button>
        ))}
      </main>

      <aside className="event-log panel">
        <h2>Advisor Log</h2>
        {log.map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}
      </aside>
    </section>
  );
}
