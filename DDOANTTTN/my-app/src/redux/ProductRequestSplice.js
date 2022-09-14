const initialState = [1];

const PRDres = (state = initialState, action) => {
    switch (action.type) {
        case 'product/res':
            return [...action.payload];
        default:
            return state;
    }
};
export default PRDres;
