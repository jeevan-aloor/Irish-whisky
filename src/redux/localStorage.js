export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState) {
        return JSON.parse(serializedState)
      } else {
        return {};
      }
    } catch (err) {
      return err;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch (err) {}
  };
  