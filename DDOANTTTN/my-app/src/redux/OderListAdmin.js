const initialState = [];

const ODERCONFIRM = (state = initialState, action) => {
    switch (action.type) {
        case 'oder/confirm':
            return [...action.payload];
        default:
            return state;
    }
};
export default ODERCONFIRM;
