import type { PlantDoc, PlantInventoryItem } from "../domain/types";
import { formatSpeciesName, getSpecies } from "./species";

const now = "2026-07-01T00:00:00.000Z";

const speciesSpecificNotes: Record<string, string> = {
  "garden-tomato": "Tomato is a warm-season vegetable grown for fruit. It needs stable moisture, strong light, support, regular observation and boringly consistent care, because apparently plants dislike chaos as much as build systems do.",
  "climbing-bean": "Climbing bean is a legume with strong vertical growth. It can support nitrogen cycling, produces edible pods or seeds, and needs a trellis before it starts reenacting structural engineering negligence.",
  "butternut-squash": "Butternut squash is a warm-season cucurbit with long vines and heavy nutrient demand. It needs space, sun, water and pest observation, especially for leaf stress and vine collapse.",
  amaranth: "Amaranth is a fast-growing warm-season crop used for leaves, grain, biomass and observation. It is useful for seed saving experiments because it grows like it has somewhere better to be."
};

export function getPlantDocs(plant: PlantInventoryItem): PlantDoc[] {
  if (plant.docs?.length) return plant.docs;

  return buildDefaultPlantDocs(plant);
}

export function buildDefaultPlantDocs(plant: PlantInventoryItem): PlantDoc[] {
  const species = getSpecies(plant.speciesId);
  const displayName = formatSpeciesName(plant.speciesId);
  const plantLabel = plant.cultivar ? `${displayName} - ${plant.cultivar}` : displayName;
  const baseId = `${plant.id}-${plant.speciesId}`;
  const note = speciesSpecificNotes[plant.speciesId] ?? `${displayName} needs plant-specific notes. The fallback exists so every plant still gets a documentation section instead of falling into the usual human paperwork swamp.`;

  return [
    {
      id: `${baseId}-life-cycle`,
      plantId: plant.id,
      speciesId: plant.speciesId,
      title: "Life Cycle",
      type: "life_cycle",
      version: "1.0",
      status: "active",
      createdAt: now,
      updatedAt: now,
      tags: ["biology", "monitor"],
      contentMarkdown: `# ${plantLabel} Life Cycle\n\n${note}\n\n## Current Monitor State\n\n- Stage: ${plant.stage}\n- Health: ${plant.health}%\n- Age: ${plant.daysOld} days\n- Quantity: ${plant.quantity}\n- Tile: ${plant.tileId}\n- Status: ${plant.status}\n\n## General Cycle\n\n1. Establishment\n2. Vegetative growth\n3. Flowering or reproductive preparation\n4. Fruit, pod, seed or biomass development\n5. Harvest or seed-saving window\n6. Cleanup, overwintering or next propagation cycle\n\n## Monitor Notes\n\nUpdate this document when growth stage, cultivar confidence, observed stress, harvest timing or propagation plan changes.`
    },
    {
      id: `${baseId}-cultivation`,
      plantId: plant.id,
      speciesId: plant.speciesId,
      title: "Cultivation Guide",
      type: "cultivation_guide",
      version: "1.0",
      status: "active",
      createdAt: now,
      updatedAt: now,
      tags: ["operations", "care"],
      contentMarkdown: `# ${plantLabel} Cultivation Guide\n\n## Requirements\n\n- Water demand: ${species?.requirements.water ?? "unknown"}/10\n- Fertilizer demand: ${species?.requirements.fertilizer ?? "unknown"}/10\n- Sun demand: ${species?.requirements.sun ?? "unknown"}/10\n- Labor demand: ${species?.requirements.labor ?? "unknown"}/10\n\n## Daily Checks\n\n- Leaf color and turgor\n- New growth\n- Soil moisture\n- Pest damage\n- Disease symptoms\n- Support or spacing problems\n\n## Local Notes\n\n${plant.notes ?? "No local notes recorded yet."}`
    },
    {
      id: `${baseId}-propagation`,
      plantId: plant.id,
      speciesId: plant.speciesId,
      title: "Propagation",
      type: "propagation",
      version: "1.0",
      status: "active",
      createdAt: now,
      updatedAt: now,
      tags: ["propagation", "seed-saving"],
      contentMarkdown: `# ${plantLabel} Propagation\n\n## Source\n\n${plant.source ?? "Source not recorded."}\n\n## Current Propagation Plan\n\n- Record viable growth points.\n- Record flowering or seed formation when observed.\n- Save cultivar/source uncertainty instead of pretending the label fairy visited.\n- Attach future propagation batches as child records under this plant.\n\n## Output Targets\n\n- Seeds, cuttings, slips, tubers or saved roots depending on species.\n- Next-season planting material.\n- Comparison data between locations and containers.`
    },
    {
      id: `${baseId}-harvest-storage`,
      plantId: plant.id,
      speciesId: plant.speciesId,
      title: "Harvest and Storage",
      type: "harvest",
      version: "1.0",
      status: "active",
      createdAt: now,
      updatedAt: now,
      tags: ["harvest", "storage"],
      contentMarkdown: `# ${plantLabel} Harvest and Storage\n\n## Harvest Trigger\n\nHarvest timing must be based on species behavior, current stage and local observations. Calendar dates are useful, but plants did not sign your calendar invite.\n\n## Record At Harvest\n\n- Date\n- Fresh weight or count\n- Quality\n- Pest or disease damage\n- Seed/tuber/root suitability\n- Storage conditions\n\n## Storage Notes\n\nAdd species-specific curing, drying, seed cleaning or overwintering notes here.`
    },
    {
      id: `${baseId}-experiments`,
      plantId: plant.id,
      speciesId: plant.speciesId,
      title: "Experiments",
      type: "experiments",
      version: "1.0",
      status: "active",
      createdAt: now,
      updatedAt: now,
      tags: ["experiment", "observations"],
      contentMarkdown: `# ${plantLabel} Experiments\n\n## Hypotheses\n\n- Compare growth by tile/container.\n- Compare stress response by watering and light exposure.\n- Track whether cultivar/source uncertainty affects useful planning.\n\n## Observations\n\nAdd dated observations below.\n\n| Date | Observation | Action | Result |\n| --- | --- | --- | --- |\n| TBD | Initial documentation record created | Monitor plant | TBD |`
    }
  ];
}
