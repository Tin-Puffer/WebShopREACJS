const initialState = [];

const PRDall = (state = initialState, action) => {
    switch (action.type) {
        case 'chart/list':
            return [...action.payload];
        default:
            return state;
    }
};
export default PRDall;
