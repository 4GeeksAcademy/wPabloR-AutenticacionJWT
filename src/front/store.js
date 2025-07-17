export const initialStore = () => {
  const token = sessionStorage.getItem("token")
  return {
    user: null,
    token: null || token,
    error: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return {
        ...store,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case "logout":
      return {
        ...store,
        user: null,
        token: null,
        error: null,
      };

    case "set_error":
      return {
        ...store,
        error: action.payload,
      };
    default:
      throw Error("Unknown action.");
  }
}
