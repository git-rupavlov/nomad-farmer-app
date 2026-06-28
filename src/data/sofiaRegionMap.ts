export type MapTerrain = "grassland" | "plains" | "forest" | "hill" | "mountain" | "water" | "urban" | "fog";

export interface MapTile {
  id: string;
  q: number;
  r: number;
  terrain: MapTerrain;
  explored: boolean;
  feature?: "pine_forest" | "orchard" | "meadow" | "wetland" | "rocks";
}

export interface MapRiver {
  id: string;
  name: string;
  points: Array<[number, number]>;
}

export interface MapRoad {
  id: string;
  name: string;
  points: Array<[number, number]>;
}

export interface MapLocation {
  id: string;
  farmId?: string;
  name: string;
  subtitle: string;
  latitude?: number;
  longitude?: number;
  x: number;
  y: number;
  marker: "city" | "site" | "village" | "natural";
  explored: boolean;
}

const terrainPattern: MapTerrain[][] = [
  ["forest", "forest", "hill", "grassland", "plains", "grassland", "forest", "water", "forest", "hill", "grassland", "plains"],
  ["forest", "hill", "mountain", "forest", "grassland", "plains", "water", "water", "grassland", "forest", "plains", "hill"],
  ["hill", "mountain", "mountain", "forest", "grassland", "urban", "grassland", "water", "forest", "grassland", "plains", "water"],
  ["grassland", "hill", "forest", "grassland", "urban", "urban", "grassland", "grassland", "forest", "plains", "water", "water"],
  ["plains", "grassland", "grassland", "forest", "grassland", "urban", "grassland", "forest", "hill", "plains", "grassland", "water"],
  ["hill", "forest", "grassland", "grassland", "grassland", "water", "grassland", "forest", "hill", "grassland", "plains", "plains"],
  ["mountain", "hill", "forest", "grassland", "water", "water", "forest", "hill", "mountain", "forest", "grassland", "plains"],
  ["mountain", "mountain", "hill", "forest", "grassland", "water", "forest", "mountain", "mountain", "forest", "grassland", "grassland"]
];

export const sofiaMapTiles: MapTile[] = terrainPattern.flatMap((row, r) =>
  row.map((terrain, q) => ({
    id: `tile-${q}-${r}`,
    q,
    r,
    terrain,
    explored: q > 1 && q < 10 && r > 0 && r < 7,
    feature: featureFor(terrain, q, r)
  }))
);

function featureFor(terrain: MapTerrain, q: number, r: number): MapTile["feature"] {
  if (terrain === "forest") return "pine_forest";
  if (terrain === "mountain" || terrain === "hill") return "rocks";
  if (terrain === "grassland" && (q + r) % 5 === 0) return "meadow";
  if (terrain === "plains" && (q + r) % 4 === 0) return "orchard";
  if (terrain === "water") return "wetland";
  return undefined;
}

export const sofiaRivers: MapRiver[] = [
  {
    id: "iskar-pancharevo",
    name: "Iskar / Pancharevo Waterline",
    points: [[735, 80], [720, 150], [760, 225], [735, 310], [790, 385], [765, 485], [820, 585], [800, 690]]
  },
  {
    id: "vladayska",
    name: "Vladayska River",
    points: [[210, 620], [270, 555], [340, 500], [430, 455], [520, 420], [600, 390]]
  },
  {
    id: "vitoshka-bistritsa",
    name: "Vitoshka Bistritsa",
    points: [[560, 710], [600, 625], [670, 560], [720, 505], [765, 455]]
  }
];

export const sofiaRoads: MapRoad[] = [
  {
    id: "sofia-east-road",
    name: "Sofia East Road",
    points: [[465, 410], [560, 395], [655, 360], [755, 330], [880, 320], [1000, 315]]
  },
  {
    id: "vurtopo-path",
    name: "Vurtopo Footpath",
    points: [[465, 410], [400, 385], [325, 380], [255, 390]]
  },
  {
    id: "south-meadow-road",
    name: "South Meadow Track",
    points: [[465, 410], [445, 500], [420, 590], [390, 690]]
  }
];

export const sofiaLocations: MapLocation[] = [
  {
    id: "sofia-balcony-map",
    farmId: "sofia-balcony",
    name: "Sofia Balcony",
    subtitle: "City garden capital",
    latitude: 42.6411,
    longitude: 23.3632,
    x: 465,
    y: 410,
    marker: "city",
    explored: true
  },
  {
    id: "vurtopo-field-map",
    farmId: "vurtopo-field",
    name: "Vurtopo Field",
    subtitle: "Wild observation plot",
    latitude: 42.6403,
    longitude: 23.3612,
    x: 255,
    y: 390,
    marker: "site",
    explored: true
  },
  {
    id: "vurtopo-park-map",
    name: "Vurtopo Park",
    subtitle: "Urban wildland",
    latitude: 42.6411,
    longitude: 23.3632,
    x: 420,
    y: 270,
    marker: "natural",
    explored: true
  },
  {
    id: "gaitanevo-map",
    name: "Gaitanevo Village",
    subtitle: "Village yard region",
    x: 690,
    y: 300,
    marker: "village",
    explored: true
  },
  {
    id: "dolno-kamartsi-map",
    name: "Dolno Kamartsi",
    subtitle: "Potential farm",
    x: 940,
    y: 320,
    marker: "village",
    explored: false
  },
  {
    id: "pancharevo-lake-map",
    name: "Pancharevo Lake",
    subtitle: "Reservoir / water landmark",
    x: 775,
    y: 585,
    marker: "natural",
    explored: true
  },
  {
    id: "lozen-mountain-map",
    name: "Lozen Mountain",
    subtitle: "South-east high ground",
    x: 610,
    y: 700,
    marker: "natural",
    explored: false
  },
  {
    id: "gorna-malina-map",
    name: "Gorna Malina",
    subtitle: "North-east region",
    x: 360,
    y: 140,
    marker: "village",
    explored: true
  }
];

export const sofiaMapMeta = {
  width: 1100,
  height: 760,
  title: "Sofia Region",
  season: "Spring, Year 1",
  note: "Procedural Civ-style map inspired by Sofia-area topology, not a GIS basemap."
};
