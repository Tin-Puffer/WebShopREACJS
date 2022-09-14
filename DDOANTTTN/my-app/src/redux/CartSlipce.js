const initialState = [];

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'cart/item':
            return [...action.payload];
        default:
            return state;
    }
};
export default cart;
