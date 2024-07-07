export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Ensure cartItems is always an array
      const cartItems = state.cartItems || [];

      const alreadyExists = cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (alreadyExists) {
        return {
          ...state,
          cartItems: cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...cartItems, action.payload],
        };
      }

    case "DELETE_FROM_CART":
      // Ensure cartItems is always an array
      const updatedCartItems = state.cartItems || [];

      return {
        ...state,
        cartItems: updatedCartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
