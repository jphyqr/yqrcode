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

export const categories = [
  { label: "Services", key: "SERVICES", emojie: "🔨" },
  { label: "Food", key: "FOOD", emojie: "🍕" },
  { label: "Social", key: "SOCIAL", emojie: "😊" },
  { label: "Shopping", key: "SHOPPING", emojie: "🛒" },
  { label: "Growth", key: "GROWTH", emojie: "🧠" },
];

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

export const services = [
  {
    emoji: "🚽",
    label: "Drains",
    category: "SERVICES",
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
  {
    emoji: "🔨",
    label: "Renos",
    category: "SERVICES",
  },
  {
    emoji: "🛒",
    label: "Groceries",
    category: "SHOPPING",
  },
  {
    emoji: "👀",
    label: "Eyes",
    category: "SERVICES",
  },
  {
    emoji: "🦷",
    label: "Dentist",
    category: "SERVICES",
  },

  { emoji: "🩸", label: "Donate Blood", category: "SERVICES" },

  { emoji: "💪", category: "GROWTH", label: "Fitness" },

  { emoji: "👓 ", category: "SHOPPING", label: "Sunglasses" },
  {
    emoji: "💄",
    category: "SERVICES",
    label: "Makeup",
  },
  {
    emoji: "💅",
    category: "SERVICES",
    label: "Nails",
  },
  {
    emoji: "💍 ",
    category: "SHOPPING",
    label: "JEWLER",
  },
  {
    emoji: "👓 ",
    category: "SHOPPING",
    label: "Sunglasses",
  },

  {
    emoji: "😊",
    category: "GROWTH",
    label: "Mental Health",
  },
  {
    emoji: "💰",
    category: "SERVICES",
    label: "Tax Return",
  },
  {
    emoji: "📈",
    category: "GROWTH",
    label: "Retire Wealthy",
  },
  {
    emoji: "👶",
    category: "SERVICES",
    label: "Sitter",
  },
  {
    emoji: "🧹",
    category: "SERVICES",
    label: "Cleaner",
  },
];

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
