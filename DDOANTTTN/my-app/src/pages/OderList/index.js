import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { odered } from '../../redux/actions';
import style from './OderList.module.css';
function CardOderList(props) {
    const newArr = [...props.list];
    return (
        <div>
            <div className={style.mainContainer}>
                <lable className={style.lableTitle}>Oder Detail</lable>

                {newArr.map((e) => (
                    <>
                        <div className={style.mainProduct}>
                            <img className={style.imgProduct} src={e.IMG}></img>

                            <div>
                                <p className={style.title}>Name Product</p>
                                <p>{e.TENSP}</p>
                            </div>
                            <div>
                                <p className={style.title}>Amount</p>
                                <p>{e.SL}</p>
                            </div>
                            <div>
                                <p className={style.title}>PRice</p>
                                <p>{e.GIA}$</p>
                            </div>
                            <div style={{ marginRight: '50px' }}>
                                <p className={style.title}>Total Price</p>
                                <p>{e.SL * e.GIA}$</p>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <div style={{ width: '80%', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto' }}>
                <h2 style={{ color: 'green' }}>
                    Total Price:{' '}
                    {newArr.reduce((s, e) => {
                        return (s += e.SL * e.GIA);
                    }, 0)}{' '}
                    $
                </h2>
                <button className={style.btnOKE} onClick={props.fn}>
                    Confirm
                </button>
            </div>
        </div>
    );
}
function OderItem({ value = {} }) {
    const account = useSelector((state) => state.ACC);
    const oder = useSelector((state) => state.ODERED);
    const dispatch = useDispatch();

    const [ishide, setIshide] = useState(false);
    const [listCart, setListCart] = useState('');

    const handleClose = () => {
        setIshide(false);
    };

    let Status = '';
    const [listOder, setListOder] = useState([]);
    useEffect(() => {
        async function fecthData() {
            if (account.MAKH) {
                await fetch(`http://localhost:3000/customer/getbymahd/${value.MADH}`)
                    .then(function (value) {
                        return value.json();
                    })
                    .then(function (data) {
                        if (data.resoult.success) {
                            setListOder([...data.resoult.value]);
                        }
                    });
            }
        }
        fecthData();
    }, []);

    const handlerDigitals = (e) => {
        e.stopPropagation();
        setIshide(true);
        fetch(`http://localhost:3000/customer/getbymahd/${value.MADH}`)
            .then(function (value) {
                return value.json();
            })
            .then(function (data) {
                if (data.resoult.success) {
                    // console.log(data.resoult.value)
                    setListCart([...data.resoult.value]);
                }
            });
    };

    async function cancelOder(id) {
        if (account.MAKH) {
            await fetch(`http://localhost:3000/customer/canceloder/${id}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({}),
            }).then(function (value) {
                return value.json();
            });
        }
    }

    const handelCancel = (e) => {
        e.stopPropagation();
        if (value.TRANGTHAI !== 2) {
            cancelOder(value.MADH);
            const newOder = oder.filter((e) => e.MADH != value.MADH);
            dispatch(odered(newOder));
        }
    };

    if (value.TRANGTHAI === 1) {
        Status = 'ORDERED';
    } else {
        Status = 'SHIPING';
    }

    return (
        <div>
            {ishide && (
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
                    <CardOderList list={listCart} fn={handleClose}></CardOderList>
                </div>
            )}
            <div
                onClick={handlerDigitals}
                style={{
                    backgroundColor: '#80808017',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <div style={{ textAlign: 'start', marginLeft: '30PX', marginTop: '10px', fontWeight: '600' }}>
                    <p style={{ fontSize: '20px' }}>Oder DATE {value.DATE}</p>
                    <p>
                        {listOder.reduce((sm, e) => {
                            return (sm += e.SL * e.GIA);
                        }, 0)}
                        $ UNPAID
                    </p>
                </div>
                <div>
                    <p
                        onClick={handelCancel}
                        style={{ cursor: 'pointer', fontWeight: 'bold', padding: '15px', margin: '0', color: 'red' }}
                    >
                        CANCLE ODER
                    </p>
                    <p style={{ color: 'gray', marginRight: '10px' }}>Oder Status: {Status}</p>
                </div>
            </div>
        </div>
    );
}

function RenderOderList() {
    const oder = useSelector((state) => state.ODERED);
    return (
        <div>
            {oder.map((e, i) => (
                <OderItem key={i} value={e}></OderItem>
            ))}
        </div>
    );
}

export default function () {
    const account = useSelector((state) => state.ACC);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fecthData() {
            if (account.MAKH) {
                await fetch(`http://localhost:3000/customer/getodered/${account.MAKH}`)
                    .then(function (value) {
                        return value.json();
                    })
                    .then(function (data) {
                        if (data.resoult.success) {
                            dispatch(odered([...data.resoult.value]));
                        }
                    });
            }
        }
        fecthData();
    });
    return (
        <div style={{ width: '1280px', maxHeight: '1000px', minHeight: '750px', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'start' }}>ODER LIST</h2>
            {<RenderOderList></RenderOderList>}
        </div>
    );
}
