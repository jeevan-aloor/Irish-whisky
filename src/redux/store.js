import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import rootReducer from "./root-reducer";
import { composeWithDevTools } from "redux-devtools-extension";


const middlewares = [thunk];
const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(...middlewares))
  );
  
store.subscribe(() => {
  saveState(store.getState());
});


export { store };
