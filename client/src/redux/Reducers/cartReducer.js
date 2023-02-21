// cartReducer.js
const initialState = {
    items: []
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        console.log("GGGGGGGG",action.payload);
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        };
      case 'UPDATE_ITEM':
        return {
          ...state,
          items: state.items.map(item => {
            if (item._id === action.payload._id) {
              return {
                ...item,
                quantity: action.payload.quantity
              };
            }
            return item;
          })
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  