import {
  CLOSE_PREVIEW,
  CLOSE_SNAP,
  CREATE_SNAP,
  PREVIEW_SNAP,
  VIEW_FILE,
  CLOSE_FILE,
  SELECT_SNAP,
  SET_THUMBNAIL,
  UPDATE_SNAP,
  EDIT_NUTRITION,
  CLOSE_NUTRITION,
  CLOSE_STORE,
  EDIT_STORE,
  OPEN_SHARE_SNAP,
  CLOSE_SHARE_SNAP,
  UPDATE_SHARE_TO,
  VIEW_CATEGORY,
  CLOSE_VIEW_CATEGORY,
  VIEW_NEXT_SNAP,
} from "./reducerConstants";

const initialState = {
  snaps: [],
  index: 0,
  create: false,
  view: false,
  preview: false,
  category: {},
  file: {},
  id: {},
  snap: {},
  editNutrition: false,
  editStore: false,
  shareSnap: false,
  viewCategory: false,
  snapsToView: [],
  snapToViewIndex: 0,
};

export const snapReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_NEXT_SNAP:
      let uIndex = state.snapToViewIndex;
      uIndex++;
      return Object.assign(state, { snapToViewIndex: uIndex });

      break;

    case VIEW_CATEGORY:
      return Object.assign(state, {
        viewCategory: true,
        category: action.category,
        snapsToView: action.snapsToView,
        snapToViewIndex: 0,
      });

      break;
    case CLOSE_VIEW_CATEGORY:
      return Object.assign(state, {
        viewCategory: false,
        category: {},
      });

      break;

    case OPEN_SHARE_SNAP:
      return Object.assign(state, { shareSnap: true });

      break;
    case CLOSE_SHARE_SNAP:
      return Object.assign(state, { shareSnap: false });

      break;

    case CLOSE_STORE:
      return Object.assign(state, { editStore: false });

      break;
    case EDIT_STORE:
      return Object.assign(state, { editStore: true });

      break;

    case CLOSE_NUTRITION:
      return Object.assign(state, { editNutrition: false });

      break;
    case EDIT_NUTRITION:
      return Object.assign(state, { editNutrition: true });

      break;
    case UPDATE_SNAP:
      let uSnap = state.snap;
      uSnap[`${action.key}`] = action.value;
      return Object.assign(state, { snap: uSnap });
      break;

    case SELECT_SNAP:
      return Object.assign(state, { snap: action.payload });

      break;
    case CLOSE_FILE:
      return Object.assign(state, { file: {} });
      break;
    case VIEW_FILE:
      return Object.assign(state, { file: action.payload });
      break;
    case CREATE_SNAP:
      return Object.assign(state, {
        create: true,
        snap: action.snap,
      });
      break;
    case CLOSE_SNAP:
      return Object.assign(state, { create: false, category: {} });
      break;
    case PREVIEW_SNAP:
      return Object.assign(state, { preview: true });
      break;
    case CLOSE_PREVIEW:
      return Object.assign(state, { preview: false });
      break;
    default:
      return state;
  }
};
