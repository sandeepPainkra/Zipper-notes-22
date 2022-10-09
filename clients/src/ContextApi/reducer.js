export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  ClEAR_USER: "ClEAR_USER",
};

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.ClEAR_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
