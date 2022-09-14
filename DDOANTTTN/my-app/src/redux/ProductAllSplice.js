const initialState = [];

const PRDall = (state = initialState, action) => {
    switch (action.type) {
        case 'product/all':
            return [...action.payload];
        default:
            return state;
    }
};
export default PRDall;
