const initialState = [];

const ODERED = (state = initialState, action) => {
    switch (action.type) {
        case 'oder/getoder':
            return [...action.payload];
        default:
            return state;
    }
};
export default ODERED;
