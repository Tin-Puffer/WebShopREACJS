const initialState = [];

const PRDall = (state = initialState, action) => {
    switch (action.type) {
        case 'review2/list':
            return [...action.payload];
        default:
            return state;
    }
};
export default PRDall;
