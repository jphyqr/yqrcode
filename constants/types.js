export const services = {
  PLUMBING: {
    emoji: "🚽",
    key: "PLUMBING",
  },
  RENOVATIONS: {
    emoji: "🔨",
    key: "RENOVATIONS",
  },
  GROCERY_DELIVERY: {
    emoji: "🛒",
    key: "GROCERY_DELIVERY",
  },
};

export const templates = {
  FRIDGE: {
    height: 500,
    width: 500,
    backgroundColor: "silver",
    fontColor: "black",
    itemHeight: 150,
    itemWidth: 150,
    items: [services.PLUMBING, services.RENOVATIONS, services.GROCERY_DELIVERY],
  },

  BATHROOM: "BATHROOM",
  MASTER_BED: "MASTER_BED",
  KIDS_BED: "KIDS_BED",
  CAR: "CAR",
  GARAGE: "GARAGE",
};
