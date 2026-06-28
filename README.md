# Nomad Farmer

A non-commercial personal plant management demo styled after the mood and UX structure of Civilization IV: Beyond the Sword.

The app treats real gardening zones as map-level farms and each farm as a city-style management screen with worked tiles, yields, buildings, plants, production tasks, vitals and turn progression.

## Current demo features

- Civ-style world map with clickable farm markers
- Farm / city screen transition
- Citizen-style tile management
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
| Health | Plant and system resilience |
| Happiness | Personal value / motivation / fun |
| Maintenance | Workload and operating cost |

## Development direction

Next steps:

1. Add species database with real crop requirements.
2. Add persistent local save data.
3. Add real calendar dates instead of abstract turns.
4. Add weather import for Bulgaria.
5. Add pest pressure and crop warnings.
6. Add map overlays for locations, irrigation and sunlight.
7. Replace emoji placeholders with custom bronze icon assets.

This is intentionally a playable prototype first, not a majestic software cathedral where tomatoes go to die.
