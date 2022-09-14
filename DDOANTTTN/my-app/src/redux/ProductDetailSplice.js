const initialState = {};

const PRDDT = (state = initialState, action) => {
    switch (action.type) {
        case 'product/detail':
            return { ...action.payload };
        default:
            return state;
    }
};
export default PRDDT;
