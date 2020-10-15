import QuoteTime from "../components/QuoteTime";

let dynComp = {};
dynComp["QuoteTime"] = QuoteTime;

export const dynamicComponents = Object.assign({}, dynComp);

export const fields = {
  ONSITE_QUOTE_TIME: {
    label: "Quote Time",
    description: "When can quoter arrive",
    component: "QuoteTime",
  },
  PHONE_CONTACT_TIME: {
    label: "Call Time",
    description: "When can you be contacted by phone",
  },
};

export const cities = {
  REGINA: {
    label: "Regina, SK",
    key: "REGINA",
  },
  SASKATOON: {
    label: "Saskatoon, SK",
    key: "Saskatoon",
  },
  EDMONTON: {
    label: "Edmonton, AB",
    key: "Edmonton",
  },
};

export const services = {
  Drains: {
    emoji: "🚽",
    label: "Drains",
    products: [
      {
        label: "Camera Spec",
        emoji: "📷",
        duration: 60,
        averageCost: 250,
      },
      {
        label: "Water Line Leak",
        emoji: "💧",
        duration: 120,
        averageCost: 300,
      },
    ],
    fields: [fields.ONSITE_QUOTE_TIME],
  },
  RENOVATIONS: {
    emoji: "🔨",
    label: "Renos",
  },
  GROCERY_DELIVERY: {
    emoji: "🛒",
    label: "Groceries",
  },
  EYES: {
    emoji: "👀",
    label: "Eyes",
  },
  FITNESS: {
    emoji: "🦷",
    label: "Dentist",
  },
  DONATE_BLOOD: {
    emoji: "🩸",
    label: "Donate Blood",
  },
  FITNESS: {
    emoji: "💪",
    label: "Fitness",
  },
  SUNGLASSES: {
    emoji: "👓 ",
    label: "Sunglasses",
  },
  MAKEUP: {
    emoji: "💄",
    label: "Makeup",
  },
  NAILS: {
    emoji: "💅",
    label: "Nails",
  },
  JEWLER: {
    emoji: "💍 ",
    label: "JEWLER",
  },
  SUNGLASSES: {
    emoji: "👓 ",
    label: "Sunglasses",
  },
  SUNGLASSES: {
    emoji: " ",
    label: "Sunglasses",
  },
  MENTAL_HEALTH: {
    emoji: "😊",
    label: "Mental Health",
  },
  TAXES: {
    emoji: "💰",
    label: "Tax Return",
  },
  INVESTMENTS: {
    emoji: "📈",
    label: "Retire Wealthy",
  },
  BABY_SITTER: {
    emoji: "👶",
    label: "Sitter",
  },
  CLEANER: {
    emoji: "🧹",
    label: "Cleaner",
  },
};

export const templates = {
  FRIDGE: {
    itemHeight: 150,
    itemWidth: 150,
    items: [
      services.Drains,
      services.CLEANER,
      services.BABY_SITTER,
      services.RENOVATIONS,
      services.GROCERY_DELIVERY,
    ],
    design: "kitchenCard",
  },

  BATHROOM: {
    itemHeight: 150,
    itemWidth: 150,
    items: [services.Drains, services.MAKEUP, services.NAILS],
    design: "bathroomCard",
  },
  MASTER_BED: {
    itemHeight: 150,
    itemWidth: 150,
    items: [
      services.FITNESS,
      services.MENTAL_HEALTH,
      services.DONATE_BLOOD,
      services.JEWLER,
      services.TAXES,
      services.INVESTMENTS,
    ],
    design: "masterBed",
  },
  KIDS_BED: "KIDS_BED",
  CAR: "CAR",
  GARAGE: "GARAGE",
};
