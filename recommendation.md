# Recommendation Notes for ChatGPT

## Local Game Install

The real game install is available from WSL at:

```text
/mnt/d/steam/steamapps/common/Sid Meier's Civilization IV Beyond the Sword
```

The original Windows path is:

```text
D:\steam\steamapps\common\Sid Meier's Civilization IV Beyond the Sword
```

Use the WSL path for command-line exploration from this repo.

## What Was Found

This is a full Steam install of Sid Meier's Civilization IV with the Beyond the Sword expansion.

Top-level content includes:

- `Assets/`: base Civilization IV data.
- `Warlords/`: Warlords expansion data.
- `Beyond the Sword/`: Beyond the Sword expansion data and executable.
- `Mods/`: base game bundled mods.
- `Beyond the Sword/Mods/`: BtS bundled scenarios/mods.
- `PublicMaps/`: map scripts and WorldBuilder saves.
- `Resource/`, `Shaders/`, `Miles/`: engine resources, shaders, and middleware.

Approximate observed counts:

- Full install files: `24620`
- BtS XML files: `121`
- BtS Python files: `55`
- BtS bundled mod folders: `12`

Important executable/runtime files:

- `Beyond the Sword/Civ4BeyondSword.exe`
- `Beyond the Sword/Civ4BeyondSword_PitBoss.exe`
- `Beyond the Sword/python24.dll`
- `Beyond the Sword/steam_api.dll`

## Best Source Material for This App

Prefer `Beyond the Sword/Assets` as the reference source. It is the most complete and final Civ IV ruleset in this install.

Most useful data folders:

- `Beyond the Sword/Assets/XML/Terrain/`
  - `CIV4TerrainInfos.xml`
  - `CIV4FeatureInfos.xml`
  - `CIV4ImprovementInfos.xml`
- `Beyond the Sword/Assets/XML/Units/`
  - `CIV4UnitInfos.xml`
  - `CIV4BuildInfos.xml`
  - `CIV4PromotionInfos.xml`
- `Beyond the Sword/Assets/XML/Buildings/`
  - `CIV4BuildingInfos.xml`
  - `CIV4BuildingClassInfos.xml`
- `Beyond the Sword/Assets/XML/Technologies/`
  - `CIV4TechInfos.xml`
- `Beyond the Sword/Assets/XML/GameInfo/`
  - civics, religions, corporations, game speeds, victory definitions, specialists, and world sizes.
- `Beyond the Sword/Assets/XML/Text/`
  - localized labels and Civilopedia text.
- `Beyond the Sword/Assets/XML/Art/`
  - art define records that map game objects to DDS/NIF/KFM assets.
- `Beyond the Sword/Assets/Python/Screens/`
  - original UI behavior and screen organization.
- `Beyond the Sword/Assets/Python/CvEventManager.py`
  - useful reference for turn/event flow.
- `Beyond the Sword/PublicMaps/`
  - BtS map scripts and scenarios.

## Current Repo Shape

This repo is a React/Vite app called Nomad Farmer.

Important files:

- `src/App.tsx`: chooses between map screen and farm/city screen.
- `src/screens/MapScreen.tsx`: Civ IV-inspired world map and farm markers.
- `src/screens/FarmCityScreen.tsx`: farm detail/city-management screen.
- `src/data/farms.ts`: initial farm/city data.
- `src/data/species.ts`: plant species data.
- `src/domain/types.ts`: domain model for yields, tiles, plants, buildings, and tasks.
- `src/store/useGameStore.ts`: Zustand game state and turn actions.
- `src/styles/civ4-theme.css`: Civ IV-like visual styling.

The app currently maps Civ IV concepts into gardening concepts:

- Civ yields are represented as `water`, `labor`, and `budget`.
- Cities are represented as farms.
- Worked plots are represented as `FarmTile`.
- Buildings are farm infrastructure.
- Production queue items are farm tasks.

## Recommended Direction

Use Civ IV as a structural and UI inspiration source, not as a direct asset dump.

Recommended next steps:

1. Build a small data adapter that imports selected Civ IV XML concepts into app-native TypeScript data.
2. Start with terrain and improvements because they map naturally to farm tiles.
3. Preserve the app's farming vocabulary while borrowing Civ IV's data organization:
   - `TerrainInfo` -> farm tile terrain archetype.
   - `ImprovementInfo` -> farm improvement archetype.
   - `BuildingInfo` -> farm building/infrastructure archetype.
   - `TechInfo` -> unlocks/research milestones.
   - `BuildInfo` -> worker/farm actions.
4. Keep the current custom yield keys (`water`, `labor`, `budget`) instead of copying Civ IV's food/production/commerce labels directly.
5. Add generated or app-native art instead of relying on Civ IV proprietary assets.

## Useful Civ IV Data Details

`CIV4TerrainInfos.xml` defines base terrain records such as `TERRAIN_GRASS` and `TERRAIN_PLAINS`.

Terrain records include:

- `Type`
- `Description`
- `Civilopedia`
- `ArtDefineTag`
- base `Yields`
- river and hills yield changes
- movement, visibility, defense, water, and settlement flags
- UI button path
- soundscape references

`CIV4ImprovementInfos.xml` defines improvements such as worked land, worked water, ruins, goody huts, farms, mines, roads-adjacent concepts, and resource improvements.

Improvement records include:

- `Type`
- `Description`
- `Civilopedia`
- `ArtDefineTag`
- validity rules for terrains/features
- irrigation, river, water, flatland, and feature requirements
- yield changes by tech and route
- upgrade and pillage behavior
- graphical-only flags

These schemas are a good model for expanding `FarmTile` and farm improvements without inventing the full structure from scratch.

## Asset Caution

Do not commit copied Civ IV game assets into this repo unless the project owner has confirmed licensing rights.

Avoid committing:

- `.dds`
- `.nif`
- `.kfm`
- `.kf`
- `.fpk`
- original audio
- original movies
- extracted Firaxis art

It is safer to reference the local install path in documentation, parse XML for personal/local experimentation, and create new original web assets for the app.

## Technical Notes

The dev server was started with:

```bash
npm run dev -- --host 0.0.0.0
```

It is accessible on the current WSL `eth0` address:

```text
http://172.29.198.196:5173/
```

Node/npm were not installed globally in this environment. A local Node runtime was unpacked at:

```text
/home/wsl-adm/.local/node-v24.18.0-linux-x64
```

Use this path in shell commands when needed:

```bash
export PATH=/home/wsl-adm/.local/node-v24.18.0-linux-x64/bin:$PATH
```

## Practical Implementation Advice

When extending the app, avoid trying to clone all Civ IV systems at once. The best first slice is:

1. Add terrain archetypes inspired by `CIV4TerrainInfos.xml`.
2. Add improvement archetypes inspired by `CIV4ImprovementInfos.xml`.
3. Make the city/farm screen show tile details in a more Civ-like way.
4. Add a simple unlock tree inspired by `CIV4TechInfos.xml`.
5. Add event/turn flavor inspired by `CvEventManager.py`.

This keeps the project playable while steadily increasing the Civ IV feel.
