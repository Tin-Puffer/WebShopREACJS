import style from './CartList.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartItem } from '../../../../redux/actions';
export function CartProduct({ value, index }) {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const carList = useSelector((state) => state.CART);
    const account = useSelector((state) => state.ACC);
    useEffect(() => {
        setCount(value.SL);
    }, []);

    const handleUp = () => {
        async function fecthData() {
            if (account.MAKH) {
                await fetch(`http://localhost:3000/customer/setcartitem/${value.MASP}/${count + 1}/${account.MAKH}`, {
                    method: 'PUT', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({}),
                })
                    .then(function (value) {
                        return value.json();
                    })
                    .then(function (data) {
                        if (data.resoult.suscess) {
                            console.log('up successfully');
                        }
                    });
            }
        }
        fecthData();
        const newArr = [...carList];
        newArr[index].SL = count + 1;
        dispatch(cartItem(newArr));

        setCount((pr) => pr + 1);
    };

    const handleDown = () => {
        if (count > 1) {
            async function fecthData() {
                if (account.MAKH) {
                    await fetch(
                        `http://localhost:3000/customer/setcartitem/${value.MASP}/${count - 1}/${account.MAKH}`,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },

                            body: JSON.stringify({}),
                        },
                    )
                        .then(function (value) {
                            return value.json();
                        })
                        .then(function (data) {
                            if (data.resoult.suscess) {
                                console.log('down successfully');
                            }
                        });
                }
            }
            fecthData();
            const newArr = [...carList];
            newArr[index].SL = count - 1;

            dispatch(cartItem(newArr));

            setCount((pr) => pr - 1);
        }
    };
    const handleDelete = () => {
        async function fecthData() {
            if (account.MAKH) {
                await fetch(`http://localhost:3000/customer/deletecart/${value.MASP}/${account.MAKH}`, {
                    method: 'DELETE', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(function (value) {
                        return value.json();
                    })
                    .then(function (data) {
                        if (data.resoult.suscess) {
                            console.log('delete successfully');
                        }
                    });
            }
        }
        fecthData();
        const newArr = carList.filter((item) => {
            return item !== value;
        });

        dispatch(cartItem(newArr));
    };
    return (
        <div style={{ display: 'flex', padding: '5px 0', width: '100%' }}>
            <div>
                <img style={{ width: '160px' }} src={value.IMG} />
            </div>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <div className={style.cart_item_title}>Name</div>
                    <div className={style.cart_item_text}>{value.TENSP}</div>
                </div>

                <div style={{ flex: 1 }}>
                    <div className={style.cart_item_title}>Quantity</div>
                    <input
                        value={count}
                        readOnly
                        style={{
                            width: '100%',
                            padding: '0',
                            marginTop: '35px',
                            textAlign: 'center',
                            fontSize: '23px',
                        }}
                        className={style.Iputcss}
                        type="number"
                    />
                    <button
                        onClick={handleUp}
                        style={{ height: '30px', width: '30px', position: 'relative', top: '-35px', left: '50px' }}
                    >
                        +
                    </button>
                    <button
                        onClick={handleDown}
                        style={{ height: '30px', width: '30px', position: 'relative', top: '-35px', left: '55px' }}
                    >
                        -
                    </button>
                </div>
                <div style={{ flex: 1 }}>
                    <div className={style.cart_item_title}>Price</div>
                    <div className={style.cart_item_text}>{value.GIASP}$</div>
                </div>
                <div style={{ flex: 1 }}>
                    <div className={style.cart_item_title}>Total</div>
                    <div className={style.cart_item_text}>{value.GIASP * count}$</div>
                </div>
                <div style={{ flex: 1 }}>
                    <img
                        onClick={handleDelete}
                        style={{ width: '30px', padding: '5px', marginRight: '25px' }}
                        src="https://www.pngplay.com/wp-content/uploads/7/Delete-Logo-Transparent-Free-PNG.png"
                    ></img>
                </div>
            </div>
        </div>
    );
}

export default function CartDeital({ fn }) {
    const account = useSelector((state) => state.ACC);
    const listCart = useSelector((state) => state.CART);
    const dispatch = useDispatch();
    const confirmCart = () => {
        if (listCart.length > 0) {
            async function fecthData() {
                if (account.MAKH) {
                    await fetch(`http://localhost:3000/customer/odernow/${account.MAKH}`, {
                        method: 'PUT', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(function (value) {
                            return value.json();
                        })
                        .then(function (data) {
                            if (data.resoult.suscess) {
                                console.log('oder successfully');
                            }
                        });
                }
            }
            fecthData();
            dispatch(cartItem([]));
        }
    };
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#00000075',
                zIndex: '4',
            }}
            className="searchResults"
        >
            <div
                style={{
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    backgroundColor: 'white',
                    marginTop: '80px',
                }}
            >
                <div className={style.cart_section}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className={style.cart_title} style={{ textAlign: 'left' }}>
                                    Shopping Cart
                                    <small>
                                        {' '}
                                        {listCart.reduce((s, e) => {
                                            return (s += e.SL);
                                        }, 0)}{' '}
                                        Product{' '}
                                        <p style={{ color: 'green' }}>
                                            Total:{' '}
                                            {listCart.reduce((s, e) => {
                                                return (s += e.GIASP * e.SL);
                                            }, 0)}
                                            $
                                        </p>
                                    </small>
                                </div>

                                <div style={{ maxHeight: '600px', overflowY: 'scroll' }}>
                                    {listCart.map((e, index) => (
                                        <CartProduct key={e.MASP} value={e} index={index}></CartProduct>
                                    ))}
                                </div>
                                <div className={style.cart_buttons}>
                                    {' '}
                                    <button
                                        onClick={fn}
                                        type="button"
                                        className={`${style.button} ${style.cart_button_clear}`}
                                    >
                                        Continue Shopping
                                    </button>
                                    <button
                                        onClick={confirmCart}
                                        type="button"
                                        className={`${style.button} ${style.cart_button_checkout}`}
                                    >
                                        Oder Now
                                    </button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
