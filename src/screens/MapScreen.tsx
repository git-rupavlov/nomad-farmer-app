import { SofiaWorldMap } from "./SofiaWorldMap";
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
          <p>Sofia Region — Civilization IV-inspired world map</p>
        </div>
        <div className="turn-box">
          <strong>Turn {turn}</strong>
          <button onClick={nextTurn}>End Turn</button>
        </div>
      </header>

      <main className="world-map interactive-world-map">
        <SofiaWorldMap farms={farms} onSelectFarm={selectFarm} />
      </main>

      <aside className="event-log panel">
        <h2>Advisor Log</h2>
        {log.map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}
      </aside>
    </section>
  );
}
