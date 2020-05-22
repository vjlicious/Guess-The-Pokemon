const initialState = {
  score: 0,
};
export default function Reducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case "ADD_SCORE":
      console.log("hi im in reducer state is", newState);
      newState.score = newState.score + 1;
      console.log("hi im in reducer state after adding is", newState);
      break;

    default:
  }
  return newState;
}
