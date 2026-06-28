import { cityYieldDefinitions } from "../data/cityYields";
import {
  sofiaLocations,
  sofiaMapMeta,
  sofiaMapTiles,
  sofiaRivers,
  sofiaRoads,
  type MapTerrain,
  type MapTile
} from "../data/sofiaRegionMap";
import type { Farm } from "../domain/types";

interface SofiaWorldMapProps {
  farms: Farm[];
  onSelectFarm: (farmId: string) => void;
}

const TILE_W = 96;
const TILE_H = 78;
const ORIGIN_X = 52;
const ORIGIN_Y = 60;

export function SofiaWorldMap({ farms, onSelectFarm }: SofiaWorldMapProps) {
  return (
    <section className="sofia-map-shell">
      <svg
        className="sofia-world-svg"
        viewBox={`0 0 ${sofiaMapMeta.width} ${sofiaMapMeta.height}`}
        role="img"
        aria-label="Interactive Civilization-style Sofia region map"
      >
        <defs>
          <linearGradient id="terrain-grassland" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5f7f38" />
            <stop offset="100%" stopColor="#31491f" />
          </linearGradient>
          <linearGradient id="terrain-plains" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b7a3c" />
            <stop offset="100%" stopColor="#4e4521" />
          </linearGradient>
          <linearGradient id="terrain-forest" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#31562b" />
            <stop offset="100%" stopColor="#172b18" />
          </linearGradient>
          <linearGradient id="terrain-hill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#766b45" />
            <stop offset="100%" stopColor="#3a3425" />
          </linearGradient>
          <linearGradient id="terrain-mountain" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#a9a89c" />
            <stop offset="45%" stopColor="#55594f" />
            <stop offset="100%" stopColor="#252923" />
          </linearGradient>
          <linearGradient id="terrain-water" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#4f8daa" />
            <stop offset="100%" stopColor="#1b405e" />
          </linearGradient>
          <linearGradient id="terrain-urban" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#7e734f" />
            <stop offset="100%" stopColor="#3f382b" />
          </linearGradient>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="#101a24" />
        <rect width="100%" height="100%" fill="url(#terrain-grassland)" opacity="0.35" />

        <g className="terrain-layer">
          {sofiaMapTiles.map((tile) => <TerrainTile key={tile.id} tile={tile} />)}
        </g>

        <g className="river-layer">
          {sofiaRivers.map((river) => (
            <g key={river.id}>
              <path d={pathFromPoints(river.points)} className="river-shadow" />
              <path d={pathFromPoints(river.points)} className="river-main">
                <title>{river.name}</title>
              </path>
            </g>
          ))}
        </g>

        <g className="road-layer">
          {sofiaRoads.map((road) => (
            <path key={road.id} d={pathFromPoints(road.points)} className="road-path">
              <title>{road.name}</title>
            </path>
          ))}
        </g>

        <g className="feature-layer">
          {sofiaMapTiles.map((tile) => <TileFeature key={`${tile.id}-feature`} tile={tile} />)}
        </g>

        <g className="location-layer">
          {sofiaLocations.map((location) => {
            const farm = location.farmId ? farms.find((entry) => entry.id === location.farmId) : undefined;
            return (
              <MapLocationMarker
                key={location.id}
                farm={farm}
                location={location}
                onSelectFarm={onSelectFarm}
              />
            );
          })}
        </g>

        <g className="fog-layer">
          {sofiaMapTiles.filter((tile) => !tile.explored).map((tile) => {
            const { x, y } = tileCenter(tile);
            return <polygon key={`${tile.id}-fog`} points={hexPoints(x, y)} className="fog-tile" />;
          })}
          <rect x="0" y="0" width="1100" height="760" className="map-vignette" />
        </g>
      </svg>

      <aside className="map-legend panel">
        <h2>{sofiaMapMeta.title}</h2>
        <p>{sofiaMapMeta.season}</p>
        <p className="small">{sofiaMapMeta.note}</p>
        <div className="legend-yields">
          {cityYieldDefinitions.map((definition) => <span key={definition.key}>{definition.icon} {definition.label}</span>)}
        </div>
      </aside>
    </section>
  );
}

function TerrainTile({ tile }: { tile: MapTile }) {
  const { x, y } = tileCenter(tile);
  return (
    <polygon points={hexPoints(x, y)} className={`terrain-tile terrain-${tile.terrain}`}>
      <title>{tile.terrain} {tile.feature ? ` / ${tile.feature}` : ""}</title>
    </polygon>
  );
}

function TileFeature({ tile }: { tile: MapTile }) {
  const { x, y } = tileCenter(tile);
  if (tile.feature === "pine_forest") {
    return (
      <g className="tree-cluster" transform={`translate(${x - 22} ${y - 18})`}>
        <Tree x={0} y={16} scale={1} />
        <Tree x={18} y={4} scale={0.82} />
        <Tree x={36} y={18} scale={0.95} />
      </g>
    );
  }
  if (tile.feature === "rocks") {
    return <path className="rock-feature" d={`M ${x - 24} ${y + 20} L ${x - 4} ${y - 18} L ${x + 14} ${y + 18} Z M ${x + 2} ${y + 22} L ${x + 28} ${y - 8} L ${x + 40} ${y + 22} Z`} />;
  }
  if (tile.feature === "meadow") {
    return <circle className="meadow-feature" cx={x} cy={y} r="10" />;
  }
  if (tile.feature === "orchard") {
    return <g className="orchard-feature"><circle cx={x - 12} cy={y} r="5" /><circle cx={x} cy={y - 8} r="5" /><circle cx={x + 12} cy={y} r="5" /></g>;
  }
  return null;
}

function Tree({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M 0 20 L 10 0 L 20 20 Z" fill="#1d3e1f" stroke="#0d1f10" />
      <path d="M 3 13 L 10 -6 L 17 13 Z" fill="#2f5a2a" stroke="#0d1f10" />
      <rect x="8" y="18" width="4" height="10" fill="#5b3b20" />
    </g>
  );
}

function MapLocationMarker({ farm, location, onSelectFarm }: {
  farm?: Farm;
  location: typeof sofiaLocations[number];
  onSelectFarm: (farmId: string) => void;
}) {
  const clickable = Boolean(location.farmId);
  const labelWidth = Math.max(120, location.name.length * 8 + 36);
  const markerClass = `map-location marker-${location.marker} ${location.explored ? "explored" : "unexplored"}`;

  const marker = (
    <g className={markerClass} transform={`translate(${location.x} ${location.y})`} filter="url(#soft-shadow)">
      <circle className="location-ring" r="14" />
      <text className="location-symbol" textAnchor="middle" dominantBaseline="central">{location.marker === "city" ? "★" : location.marker === "natural" ? "◆" : "●"}</text>
      <rect className="location-label-bg" x="18" y="-18" width={labelWidth} height="36" rx="4" />
      <text className="location-label" x="28" y="-2">{location.name}</text>
      <text className="location-subtitle" x="28" y="12">{farm ? `🍅 ${farm.yields.food} 🔬 ${farm.yields.science} 🌻 ${farm.yields.culture}` : location.subtitle}</text>
      <title>{location.name} — {location.subtitle}</title>
    </g>
  );

  if (!clickable || !location.farmId) return marker;
  return (
    <g className="clickable-location" onClick={() => onSelectFarm(location.farmId!)} role="button" tabIndex={0}>
      {marker}
    </g>
  );
}

function tileCenter(tile: MapTile) {
  return {
    x: ORIGIN_X + tile.q * TILE_W + (tile.r % 2) * (TILE_W / 2),
    y: ORIGIN_Y + tile.r * (TILE_H * 0.75)
  };
}

function hexPoints(cx: number, cy: number) {
  const r = 44;
  return Array.from({ length: 6 }, (_, index) => {
    const angle = Math.PI / 180 * (60 * index + 30);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

function pathFromPoints(points: Array<[number, number]>) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}
