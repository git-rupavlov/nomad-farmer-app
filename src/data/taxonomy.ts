export type StatKey =
  | "maintenance"
  | "water"
  | "sunlight"
  | "shade"
  | "soil_moisture"
  | "biomass_green"
  | "biomass_brown"
  | "wood_ash"
  | "wood_material"
  | "pollinators"
  | "seeds"
  | "nitrogen"
  | "phosphorus"
  | "potassium"
  | "soil_airflow"
  | "security"
  | "biomass_capacity";

export type Specs = Partial<Record<StatKey, number>>;

export interface TaxonomyNode {
  id: string;
  common_name: string;
  latin_name?: string;
  category: string;
  specs: Specs;
  children?: Record<string, TaxonomyNode>;
}

export const resourceKeys: StatKey[] = [
  "maintenance",
  "water",
  "sunlight",
  "shade",
  "soil_moisture",
  "biomass_green",
  "biomass_brown",
  "wood_ash",
  "wood_material",
  "pollinators",
  "seeds",
  "nitrogen",
  "phosphorus",
  "potassium",
  "soil_airflow",
  "security",
  "biomass_capacity"
];

export const cityTaxonomy = {
  buildings: {
    greenhouse: { id: "greenhouse", common_name: "greenhouse", category: "climate_control", specs: { maintenance: -1, shade: 1, sunlight: -0.5, soil_moisture: 0.5 } },
    irrigation: { id: "irrigation", common_name: "irrigation", category: "water", specs: { maintenance: -0.5, water: 2, soil_moisture: 2 } },
    vine_arc: { id: "vine_arc", common_name: "vine arc", category: "support", specs: { maintenance: -1, shade: 2, sunlight: -1, soil_moisture: 0.5 } },
    vine_spiral: { id: "vine_spiral", common_name: "vine spiral", category: "support", specs: { maintenance: -0.5, shade: 1, sunlight: -0.5 } },
    compost_pit: { id: "compost_pit", common_name: "compost pit", category: "compost", specs: { biomass_green: -1, biomass_brown: -1, soil_moisture: 0.5, nitrogen: 1, phosphorus: 0.5, potassium: 0.5 } },
    compost_pile: { id: "compost_pile", common_name: "compost pile", category: "compost", specs: { biomass_green: -1, biomass_brown: -1, nitrogen: 0.5, soil_moisture: 0.25 } },
    compost_confine: { id: "compost_confine", common_name: "compost confine", category: "compost", specs: { maintenance: -0.5, biomass_capacity: 2 } },
    tomato_tower: { id: "tomato_tower", common_name: "tomato tower", category: "support", specs: { maintenance: -0.5, sunlight: 0.5 } },
    tomato_pole: { id: "tomato_pole", common_name: "tomato pole", category: "support", specs: { maintenance: -0.25 } },
    tomato_cage: { id: "tomato_cage", common_name: "tomato cage", category: "support", specs: { maintenance: -0.5, shade: 0.5 } },
    tomato_arc: { id: "tomato_arc", common_name: "tomato arc", category: "support", specs: { maintenance: -0.75, shade: 1, sunlight: -0.5 } },
    pumpkin_tower: { id: "pumpkin_tower", common_name: "pumpkin tower", category: "support", specs: { maintenance: -1, shade: 2, sunlight: -1 } },
    cctv_outpost: { id: "cctv_outpost", common_name: "cctv outpost", category: "monitoring", specs: { maintenance: -0.25, security: 2 } }
  },
  improvements: {
    weeded: { id: "weeded", common_name: "weeded", category: "soil_work", specs: { maintenance: -1, sunlight: 0.5, soil_moisture: -0.25, biomass_green: 1 } },
    mulched: { id: "mulched", common_name: "mulched", category: "soil_cover", specs: { maintenance: -0.5, sunlight: -0.25, soil_moisture: 1, biomass_brown: -1 } },
    excavated: { id: "excavated", common_name: "excavated", category: "soil_work", specs: { maintenance: 0.5, soil_airflow: 1, soil_moisture: -0.5 } }
  },
  plants: {
    fruit_trees: {
      wild_apple: { id: "wild_apple", common_name: "wild apple", latin_name: "Malus sylvestris", category: "fruit_tree", specs: { sunlight: 1, shade: 1, soil_moisture: -1, pollinators: 1, biomass_brown: 1 } },
      wild_pear: { id: "wild_pear", common_name: "wild pear", latin_name: "Pyrus pyraster", category: "fruit_tree", specs: { sunlight: 1, shade: 1, soil_moisture: -1, pollinators: 1, biomass_brown: 1 } },
      wild_plum: { id: "wild_plum", common_name: "wild plum", latin_name: "Prunus domestica subsp. insititia", category: "fruit_tree", specs: { sunlight: 1, shade: 1.5, soil_moisture: -1, pollinators: 1, biomass_brown: 1 } }
    },
    berry_bushes: {
      wild_blackberry: { id: "wild_blackberry", common_name: "wild blackberry", latin_name: "Rubus fruticosus agg.", category: "berry_bush", specs: { sunlight: 0.5, shade: 1, soil_moisture: -0.5, biomass_green: 1, pollinators: 1 } },
      wild_raspberry: { id: "wild_raspberry", common_name: "wild raspberry", latin_name: "Rubus idaeus L.", category: "berry_bush", specs: { sunlight: 0.5, shade: 0.5, soil_moisture: -1, biomass_green: 1, pollinators: 1 } },
      wild_blueberry: { id: "wild_blueberry", common_name: "wild blueberry", latin_name: "Vaccinium myrtillus L.", category: "berry_bush", specs: { shade: 0.5, soil_moisture: -1, biomass_green: 0.5, pollinators: 1 } }
    },
    herbs: {
      wild_mint: { id: "wild_mint", common_name: "wild mint", latin_name: "Mentha spp.", category: "herb", specs: { soil_moisture: -1, biomass_green: 1, pollinators: 1 } },
      wild_rosemary: { id: "wild_rosemary", common_name: "wild rosemary", latin_name: "Salvia rosmarinus Spenn.", category: "herb", specs: { sunlight: 1.5, soil_moisture: -0.5, pollinators: 1 } }
    },
    vegetables: {
      garden_tomato: { id: "garden_tomato", common_name: "garden tomato", latin_name: "Solanum lycopersicum L.", category: "vegetable", specs: { maintenance: 2, sunlight: 2, soil_moisture: -1, nitrogen: -1, phosphorus: -1, potassium: -2 } },
      cucumber: { id: "cucumber", common_name: "cucumber", latin_name: "Cucumis sativus L.", category: "vegetable", specs: { maintenance: 1.5, sunlight: 1.5, soil_moisture: -2, potassium: -1 } },
      squash: { id: "squash", common_name: "squash", latin_name: "Cucurbita spp.", category: "vegetable", specs: { maintenance: 1, sunlight: 2, shade: -1, soil_moisture: -2, potassium: -2 } }
    },
    flowers: {
      marigold: { id: "marigold", common_name: "marigold", latin_name: "Tagetes spp.", category: "flower", specs: { sunlight: 1, pollinators: 1, maintenance: 0.25 } },
      sunflower: { id: "sunflower", common_name: "sunflower", latin_name: "Helianthus annuus L.", category: "flower", specs: { sunlight: 2, soil_moisture: -1, pollinators: 1, seeds: 1, biomass_brown: 1 } }
    },
    weeds: {
      wild_bean: { id: "wild_bean", common_name: "wild bean", latin_name: "Vicia spp.", category: "weed", specs: { maintenance: 1, sunlight: -0.5, soil_moisture: 1, nitrogen: 1, phosphorus: 0.25, potassium: 0.25 } },
      wild_grass: { id: "wild_grass", common_name: "wild grass", latin_name: "Poaceae spp.", category: "weed", specs: { maintenance: 1, soil_moisture: -0.5, biomass_green: 1 } }
    }
  }
} as const;

export function formatTaxonomyName(node: Pick<TaxonomyNode, "common_name" | "latin_name">) {
  return node.latin_name ? `${node.common_name} (${node.latin_name})` : node.common_name;
}
