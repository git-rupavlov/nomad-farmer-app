# Nomad Farmer

A non-commercial personal plant management demo styled after the mood and UX structure of Civilization IV: Beyond the Sword.

The app treats real gardening zones as map-level farms and each farm as a city-style management screen with worked tiles, yields, buildings, plants, production tasks, vitals and turn progression.

## Current demo features

- Civ-style world map with clickable farm markers
- Farm / city screen transition
- Citizen-style tile management
- Terrain archetypes inspired by Civ IV terrain data organization
- Improvement archetypes inspired by Civ IV improvement rules
- Simple unlock tree for farm technologies
- Water, labor and budget yields
- Plant health and growth stage tracking
- Buildings panel
- Production queue with labor progress
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
- Click Apply Labor on tasks to progress production.
- Click End Turn to update plant age, health, stored water, fertilizer and yields.

## Civ IV translation layer

| Civ IV concept | Nomad Farmer concept |
| --- | --- |
| City | Farm / gardening zone |
| Food | Water and fertilizer support |
| Hammers | Labor and structural work |
| Commerce | Budget tracking |
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

- `src/data/terrainArchetypes.ts`: app-native terrain model inspired by Civ IV terrain XML structure.
- `src/data/improvementArchetypes.ts`: farm improvement model inspired by Civ IV improvement XML structure.
- `src/data/unlockTree.ts`: simple technology/unlock tree.
- `src/data/farms.ts`: playable farm seed data mapped to archetype IDs.
- `src/domain/types.ts`: shared domain model for farms, tiles, plants, buildings and tasks.
- `src/screens/FarmCityScreen.tsx`: city screen with Civ-like tile details.

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
