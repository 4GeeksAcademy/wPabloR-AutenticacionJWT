export const initialStore = () => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (e) {
    user = null;
  }
  return {
    user: user,
    token: token,
    error: null,
    auth: !!token,
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
        auth: true,
      };

    case "logout":
      return {
        ...store,
        user: null,
        token: null,
        error: null,
        auth: false,
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
