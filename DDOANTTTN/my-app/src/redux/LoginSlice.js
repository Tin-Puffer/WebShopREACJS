const initialState = {
    Ten: '',
    Gt: 0,
    SDT: '',
    TAIKHOAN: '',
    Email: '',
    IMG: '',
    MAKH: '',
    DiaChi: '',
    MatKhau: '',
    ADMIN: false,
    LOGIN: false,
};
const account = (state = initialState, action) => {
    switch (action.type) {
        case 'login/Account':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export default account;
