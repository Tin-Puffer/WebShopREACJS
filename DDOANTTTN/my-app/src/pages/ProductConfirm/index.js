import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../HomeHeader';
import { OderConfirm, review2 } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
function ListItem({ MAKH, MADH }) {
    const navigate = useNavigate();
    const list = useSelector((state) => state.RV2);
    const handelClick = (list, MAKH) => {
        const idlist = list.map((e) => {
            return e.MASP;
        });
        async function fetchData() {
            await fetch(`http://localhost:3000/admin/configoder/${MADH}`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    MAKH: MAKH,
                    list: [...idlist],
                }),
            })
                .then((response) => response.json())
                .then((returnValue) => {
                    if (returnValue.resoult.suscess) {
                        navigate('/adminpage');
                    }
                });
        }
        fetchData();
    };

    return (
        <div>
            {list.map((e, i) => (
                <div
                    key={i}
                    style={{
                        minHeight: '150px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 20px',
                        margin: '10px 0',
                        backgroundColor: '#8080803b',
                    }}
                >
                    <img style={{ maxHeight: '100px' }} src={e.IMG}></img>
                    <p>Name Product: {e.TENSP}</p>
                    <p>PRICE :{e.GIA}</p>
                    <p>AMOUNT :{e.SL}</p>
                </div>
            ))}
            <h1 style={{ color: 'green' }}>
                Total:{' '}
                {list.reduce((s, e) => {
                    return s + e.GIA * e.SL;
                }, 0)}{' '}
                $
            </h1>
            <button onClick={() => handelClick(list, MAKH)} style={{ margin: '10px 0' }}>
                CONFIRM
            </button>
        </div>
    );
}
function OderDeltail({ MADH, fn, MAKH }) {
    const dispatch = useDispatch();
    async function fecthData() {
        await fetch(`http://localhost:3000/customer/getbymahd/${MADH}`)
            .then(function (value) {
                return value.json();
            })
            .then(function (data) {
                if (data.resoult.success) {
                    dispatch(review2([...data.resoult.value]));
                }
            });
    }
    fecthData();
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: '#8080803b' }}>
            <div
                style={{
                    width: '80%',
                    minHeight: '300px',
                    marginTop: '90px',
                    backgroundColor: 'white',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <h1>Deltail Oder</h1>
                <button onClick={fn} style={{ position: 'absolute', right: '195px', top: '100px' }}>
                    Close
                </button>
                <div
                    style={{
                        width: '90%',
                        minHeight: '300px',
                        maxHeight: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        overflowY: 'scroll',
                    }}
                >
                    <ListItem MAKH={MAKH} MADH={MADH} fun={fn}></ListItem>
                </div>
            </div>
        </div>
    );
}
function ConfirmItem({ value }) {
    const [cover, setCover] = useState(false);
    const handleClick = () => {
        setCover((pr) => !pr);
    };
    return (
        <div>
            {(cover && <OderDeltail MAKH={value.MAKH} MADH={value.MADH} fn={handleClick}></OderDeltail>) || (
                <div onClick={handleClick} style={{ minHeight: '150px', backgroundColor: '#edebeb', margin: '20px 0' }}>
                    <div style={{ display: 'flex', width: '100%', margin: '5px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>CODE ODER :</p>
                        <p style={{ color: 'black', margin: '0' }}>{value.MADH}</p>
                    </div>
                    <div style={{ display: 'flex', width: '100%', margin: '5px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>CUSTOMER: </p>
                        <p style={{ color: 'black', margin: '0' }}>{value.TEN}</p>
                    </div>
                    <div style={{ display: 'flex', width: '100%', margin: '5px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>PHONE: </p>
                        <p style={{ color: 'black', margin: '0' }}>{value.SDT}</p>
                    </div>
                    <div style={{ display: 'flex', width: '100%', margin: '5px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>EMAIL: </p>
                        <p style={{ color: 'black', margin: '0' }}>{value.EMAIL}</p>
                    </div>
                    <div style={{ display: 'flex', width: '100%', margin: '5px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>PHONE: </p>
                        <p style={{ color: 'black', margin: '0' }}>{value.SDT}</p>
                    </div>
                    <div style={{ display: 'flex', width: '100%', margin: '5px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>ADDRESS: </p>
                        <p style={{ color: 'black', margin: '0' }}>{value.DIACHI}</p>
                    </div>
                    <div style={{ display: 'flex', width: '100%', margin: '5px' }}>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>ODER DATE: </p>
                        <p style={{ color: 'black', margin: '0' }}>{value.DATE}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
function ConfirmOder() {
    const oderc = useSelector((state) => state.ODERC);
    console.log(oderc);
    return (
        <div>
            {oderc.map((e) => (
                <ConfirmItem key={e.MADH} value={e}></ConfirmItem>
            ))}
        </div>
    );
}
export default function () {
    const dispatch = useDispatch();

    async function fecthData() {
        await fetch(`http://localhost:3000/admin/getconfirm`)
            .then(function (value) {
                return value.json();
            })
            .then(function (data) {
                if (data.resoult.success) {
                    dispatch(OderConfirm([...data.resoult.data]));
                }
            });
    }
    fecthData();
    return (
        <div style={{ width: '1320px', height: '950px', backgroundColor: 'white' }}>
            <HomeHeader></HomeHeader>
            <ConfirmOder></ConfirmOder>
        </div>
    );
}
