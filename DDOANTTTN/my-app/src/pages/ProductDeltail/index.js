import style from './ProductDeltail.module.css';
import { Itemcard } from '../Home/index';
import { useDispatch, useSelector } from 'react-redux';
import { cartItem, deltaiPoduct } from '../../redux/actions';
import { useEffect, useState } from 'react';
function DeltailProductPage() {
    const proDT = useSelector((state) => state.PRDT);
    const carList = useSelector((state) => state.CART);
    const user = useSelector((state) => state.ACC);
    const dispatch = useDispatch();
    const [fnew, setFnew] = useState([]);
    const [amount, setAmount] = useState(1);
    useEffect(() => {
        async function fecthDataNEW() {
            await fetch(`http://localhost:3000/product/rs0`)
                .then(function (value) {
                    return value.json();
                })
                .then(function (data) {
                    if (data.resoult.success) {
                        setFnew([...data.resoult.data]);
                    }
                });
        }
        fecthDataNEW();
    }, [proDT]);

    async function addCartDB(value) {
        await fetch(`http://localhost:3000/customer/updatecart${user.MAKH}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MASP: value.MASP,
                GIASP: value.GIASP,
            }),
        })
            .then((response) => response.json())
            .then((returnValue) => {
                console.log(returnValue);
            });
    }

    const addToCart = (e) => {
        e.stopPropagation();
        addCartDB(proDT);
        if (carList.findIndex((x) => x.MASP === proDT.MASP) !== -1) {
            const newArr = [...carList];
            newArr[carList.findIndex((x) => x.MASP === proDT.MASP)].SL += 1;
            dispatch(cartItem(newArr));
        } else {
            dispatch(
                cartItem([
                    ...carList,
                    {
                        IMG: proDT.IMG,
                        MASP: proDT.MASP,
                        TENSP: proDT.TENSP,
                        SL: 1,
                        GIASP: proDT.GIASP,
                    },
                ]),
            );
        }
    };
    const changeValue = (e) => {};
    return (
        <div className={style.main}>
            <div className={style.container}>
                <div
                    style={{ width: '100%', textAlign: 'start' }}
                    className="col-lg-8 border p-3 main-section bg-white"
                >
                    <div className="row hedding m-0 pl-3 pt-0 pb-3">Product Detail</div>
                    <div className="row m-0">
                        <div className="col-lg-4 left-side-product-box pb-3">
                            <img style={{ width: '400px' }} src={proDT.IMG} className="border p-3" />
                        </div>
                        <div className="col-lg-8">
                            <div className="right-side-pro-detail border p-3 m-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <p style={{ fontSize: '23px' }} className="m-0 p-0">
                                            {proDT.TENSP}
                                        </p>
                                    </div>
                                    <div className="col-lg-12">
                                        <p
                                            style={{ fontSize: '28px', color: 'green', fontWeight: 'bold' }}
                                            className="m-0 p-0 price-pro"
                                        >
                                            {proDT.GIASP}$
                                        </p>
                                        <hr className="p-0 m-0" />
                                    </div>
                                    <div className="col-lg-12 pt-2">
                                        <h5>
                                            Start Rating : {proDT.VOTE || 0}{' '}
                                            <img
                                                style={{
                                                    width: '23px',
                                                    position: 'relative',
                                                    marginRight: '20px',
                                                    top: '-2px',
                                                }}
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png"
                                            ></img>
                                            {proDT.MADG || 0} Rating Vote
                                        </h5>

                                        <hr className="m-0 pt-2 mt-2" />
                                    </div>
                                    <div className="col-lg-12">
                                        <p className={style.tagsection}>
                                            <strong>Tag : </strong>
                                            <a href="">{proDT.LOAI}</a>
                                        </p>
                                    </div>
                                    <div className="col-lg-12">
                                        <h6>Quantity :</h6>
                                        <input
                                            type="number"
                                            className="form-control text-center w-100"
                                            value={amount}
                                            onChange={changeValue}
                                        />
                                    </div>
                                    <div className="col-lg-12 mt-3">
                                        <div style={{ width: '100%' }} className="row">
                                            <div className="col-lg-12 pb-2">
                                                <a onClick={addToCart} className="btn btn-danger w-100">
                                                    Add To Cart
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center pt-3">
                            <h4 style={{ textAlign: 'start' }}>Specifications</h4>
                        </div>
                    </div>
                    <div className="row mt-12 p-0 text-center pro-box-section">
                        <div className="col-lg-12 pb-2">
                            <div className="pro-box border p-0 m-0">
                                <img style={{ width: '1000px' }} src={proDT.TSIMG} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center pt-3">
                            <h4 style={{ textAlign: 'start' }}>More Product</h4>
                        </div>
                    </div>
                    <div className="row mt-3 p-0 text-center pro-box-section">
                        {fnew.map((e) => {
                            return (
                                <div key={e.MASP} className="col-lg-3 pb-2">
                                    <Itemcard style={{ marginTop: '20px' }} value={e}></Itemcard>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function DeltailProduct() {
    const dispatch = useDispatch();
    const proDT = useSelector((state) => state.PRS);

    async function fecthData(id) {
        await fetch(`http://localhost:3000/product/fulldetail/${id}`)
            .then(function (value) {
                return value.json();
            })
            .then(function (data) {
                if (data.resoult.success) {
                    dispatch(deltaiPoduct(...data.resoult.data));
                }
            });
    }
    fecthData(window.localStorage.getItem('MASP'));
    return <DeltailProductPage></DeltailProductPage>;
}
