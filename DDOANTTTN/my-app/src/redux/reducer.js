import account from './LoginSlice';
import cartItem from './CartSlipce';
import odered from './OderedSplice';
import ProductAll from './ProductAllSplice';
import ProductDeltail from './ProductDetailSplice';
import ProductDeltail2 from './ProductDetailSplice2';
import Review from './ReviewSplice';
import Review2 from './ReviewSplice2';
import OderConfirm from './OderListAdmin';
import Chart from './ChartSplice';

import productrequest from './ProductRequestSplice';
const rootReducer = (state = {}, action) => {
    return {
        ACC: account(state.ACC, action),
        CART: cartItem(state.CART, action),
        ODERED: odered(state.ODERED, action),
        PRS: productrequest(state.PRS, action),
        PRA: ProductAll(state.PRA, action),
        PRDT: ProductDeltail(state.PRDT, action),
        PRDT2: ProductDeltail2(state.PRDT2, action),
        RV: Review(state.RV, action),
        RV2: Review2(state.RV2, action),
        CHART: Chart(state.CHART, action),
        ODERC: OderConfirm(state.ODERC, action),
    };
};
export default rootReducer;
