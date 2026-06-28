# Nomad Farmer

A non-commercial personal plant management demo styled after the mood and UX structure of Civilization IV: Beyond the Sword.

The app treats real gardening zones as map-level farms and each farm as a city-style management screen with worked tiles, yields, buildings, plants, production tasks, vitals and turn progression.

## Current demo features

- Interactive Civ-style Sofia region SVG world map
- Clickable real-world-inspired locations and farms
- Terrain, rivers, roads, forests, hills, water, fog and location labels as separate UI layers
- Farm / city screen transition
- Citizen-style tile management
- Exact plant-based city inventory ledger
- Canonical city yield model: food, maintenance, goods, budget, science and culture
- Canonical city taxonomy for buildings, improvements, plants and resources
- Terrain archetypes inspired by Civ IV terrain data organization
- Improvement archetypes inspired by Civ IV improvement rules
- Simple unlock tree for farm technologies
- Normalized plant inventory using `common_name (latin_name)` display names
- Normalized building inventory using shared infrastructure catalog entries
- Plant health and growth stage tracking
- Buildings inventory panel
- Production queue with work progress
- End Turn simulation
- Advisor event log
- Seed data for Sofia Balcony and Vurtopo Outpost

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite local URL printed in the terminal.

## Build

```bash
npm run build
```

## Controls

- Click a farm marker on the world map to open the farm city screen.
- Click tiles to toggle whether they are worked.
- Click Apply Work on tasks to progress production.
- Click End Turn to update plant age, health, stored water, fertilizer and yields.

## Sofia world map

The world map is not a static PNG. It is rendered from data:

- `src/data/sofiaRegionMap.ts`: map tiles, rivers, roads and locations
- `src/screens/SofiaWorldMap.tsx`: interactive SVG renderer
- `src/styles/civ4-theme.css`: terrain, river, road, fog and marker styling

The layout is a Civ-style abstraction inspired by Sofia-area topology, not a GIS basemap. Vitosha is represented toward the south/southwest, the Iskar/Pancharevo water system toward the east/southeast, Lozen Mountain toward the southeast, and Sofia/Vurtopo locations near the central urban zone. In other words: useful game geography, not a cadastral document, because this is a garden strategy app and not municipal paperwork cosplay.

## Exact plant inventory model

Each city/farm owns `plantInventory`, not vague local plant names. Every inventory row stores exact local facts:

- `speciesId`
- `quantity`
- `stage`
- `health`
- `daysOld`
- `tileId`
- `cultivar`
- `source`
- `container`
- `status`
- observed flags for flowering, fruiting, pests and disease
- notes

The city screen renders this as a plant ledger. Turn simulation also uses this ledger for water demand, fertilizer demand, stress, growth stage and status changes. That way the city is plant-based instead of vibes-based, which is apparently a revolutionary idea in software.

## Canonical city yields

The six top-level city yields are:

| Yield | Meaning |
| --- | --- |
| `food` | Plant production and edible biomass |
| `maintenance` | Required work to keep the location operational. Higher is worse. |
| `goods` | Physical inventory, harvest, compost, wood, seeds and equipment |
| `budget` | Money spent or earned |
| `science` | Knowledge from observations, experiments, sensors and records |
| `culture` | Biodiversity, aesthetics and ecosystem value |

Water, sunlight, shade, soil moisture, nitrogen, phosphorus and potassium remain resource/stat modifiers. They are not top-level city yields, because mixing resource state with economic output is how apps become compost.

## Naming and inventory model

Plants and buildings use shared catalog definitions. Individual locations do not invent their own names for the same thing.

Plant display format:

```text
garden tomato (Solanum lycopersicum L.)
```

Location inventory stores local facts only:

- `speciesId` or `buildingId`
- `quantity`
- stage/status
- health/condition
- tile assignment
- origin and notes

This keeps each location comparable while allowing stats to differ based on actual local inventory, condition and management.

## Canonical taxonomy

`src/data/taxonomy.ts` is the common vocabulary layer. It defines:

- buildings: `greenhouse`, `irrigation`, `vine_arc`, `compost_pit`, `tomato_tower`, `cctv_outpost`, etc.
- improvements: `weeded`, `mulched`, `excavated`
- plants grouped as fruit trees, berry bushes, herbs, vegetables, flowers and weeds
- resource/stat keys: `maintenance`, `water`, `sunlight`, `shade`, `soil_moisture`, `biomass_green`, `biomass_brown`, `wood_ash`, `wood_material`, `pollinators`, `seeds`, `nitrogen`, `phosphorus`, `potassium`, `soil_airflow`, `security`, `biomass_capacity`

Specs are signed numeric modifiers:

```ts
nitrogen: -1 // consumes or reduces nitrogen
nitrogen: 0  // neutral, usually omitted
nitrogen: 1  // adds or supports nitrogen
```

Use numbers, not quoted strings. `"-1"` looks innocent right up until arithmetic turns into performance art.

Catalogs may expose app-specific IDs, but their canonical names and taxonomy IDs should come from this layer whenever possible. Yes, this is bureaucracy, but the useful kind, allegedly.

## Civ IV translation layer

| Civ IV concept | Nomad Farmer concept |
| --- | --- |
| City | Farm / gardening zone |
| Food | Food / plant production |
| Hammers | Goods and work progress |
| Commerce | Budget, science and culture |
| Buildings | Greenhouses, trellises, compost, irrigation, sensors |
| Citizen tiles | Containers, beds, wild patches, greenhouse trays |
| TerrainInfo | Terrain archetypes for farm tile base behavior |
| ImprovementInfo | Improvement archetypes for tile upgrades |
| TechInfo | Unlock tree milestones |
| Health | Plant and system resilience |
| Happiness | Personal value / motivation / fun |
| Maintenance | Workload and operating cost |

## Architecture notes

Important files:

- `src/data/sofiaRegionMap.ts`: Sofia region world map data.
- `src/screens/SofiaWorldMap.tsx`: interactive SVG world map renderer.
- `src/data/cityYields.ts`: canonical yield model and UI definitions.
- `src/data/taxonomy.ts`: canonical city vocabulary for buildings, improvements, plants and resources.
- `src/data/species.ts`: canonical plant species catalog using `common_name` and `latin_name` from taxonomy where available.
- `src/domain/inventory.ts`: exact plant inventory summary and demand helpers.
- `src/data/buildingCatalog.ts`: canonical building/infrastructure inventory catalog aligned with taxonomy.
- `src/data/terrainArchetypes.ts`: app-native terrain model inspired by Civ IV terrain XML structure.
- `src/data/improvementArchetypes.ts`: farm improvement model inspired by Civ IV improvement XML structure.
- `src/data/unlockTree.ts`: simple technology/unlock tree.
- `src/data/farms.ts`: playable farm seed data mapped to catalog and archetype IDs.
- `src/domain/types.ts`: shared domain model for farms, tiles, plant inventory, buildings and tasks.
- `src/screens/FarmCityScreen.tsx`: city screen with Civ-like tile details and exact plant ledger.

No proprietary Civ IV assets are committed. The project uses Civ IV as structural and UX inspiration only, because intellectual property lawsuits are not a fun hidden tech path.

## Development direction

Next steps:

1. Add persistent local save data.
2. Add real calendar dates instead of abstract turns.
3. Add weather import for Bulgaria.
4. Add pest pressure and crop warnings.
5. Add map overlays for locations, irrigation and sunlight.
6. Replace emoji placeholders with custom bronze icon assets.
7. Add unlock progression actions instead of static unlocked flags.

This is intentionally a playable prototype first, not a majestic software cathedral where tomatoes go to die.
