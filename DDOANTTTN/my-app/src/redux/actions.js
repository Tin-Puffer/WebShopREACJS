export const login = (data) => {
    return {
        type: 'login/Account',
        payload: data,
    };
};
export const cartItem = (data) => {
    return {
        type: 'cart/item',
        payload: data,
    };
};
export const odered = (data) => {
    return {
        type: 'oder/getoder',
        payload: data,
    };
};
export const review = (data) => {
    return {
        type: 'review/list',
        payload: data,
    };
};
export const review2 = (data) => {
    return {
        type: 'review2/list',
        payload: data,
    };
};
export const chart = (data) => {
    return {
        type: 'chart/list',
        payload: data,
    };
};
export const reviewList = (data) => {
    return {
        type: 'review/listINFO',
        payload: data,
    };
};
export const allProduct = (data) => {
    return {
        type: 'product/all',
        payload: data,
    };
};
export const resproduct = (data) => {
    return {
        type: 'product/res',
        payload: data,
    };
};
export const deltaiPoduct = (data) => {
    return {
        type: 'product/detail',
        payload: data,
    };
};
export const deltaiPoduct2 = (data) => {
    return {
        type: 'product/detail2',
        payload: data,
    };
};
export const OderConfirm = (data) => {
    return {
        type: 'oder/confirm',
        payload: data,
    };
};
