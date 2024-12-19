import { initGlobalState } from "qiankun";

// Initialize global state with default values
const initialState = { user: {}, theme: "light", isLoggedIn: false };

// Create the global state
const actions = initGlobalState(initialState);

// Add a listener to log state changes (for debugging)
actions.onGlobalStateChange((state, prev) => {
  console.log("Root App Log:", state);
});

// Custom helper to keep track of the latest global state
let currentState = initialState;

// Update the currentState variable whenever the state changes
actions.onGlobalStateChange((state) => {
  currentState = state;
});

// Custom method to get the current state
const getGlobalState = () => currentState;

const enhancedActions = {
  ...actions,
  getGlobalState, // Add the custom getGlobalState method
  setGlobalState: (newState) => {
    currentState = { ...currentState, ...newState }; // Update the local state immediately
    actions.setGlobalState(newState); // Propagate the update
  },
};


// Export enhanced actions
export default enhancedActions;
