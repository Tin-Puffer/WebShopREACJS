import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { review } from '../../redux/actions';
import style from './Privew.module.css';
function RenderItem({ e }) {
    const [start, setStart] = useState();
    const account = useSelector((state) => state.ACC);
    useEffect(() => {
        setStart(e.VOTE);
    }, []);

    async function fecthData(idcart, amount) {
        if (account.MAKH) {
            await fetch(`http://localhost:3000/customer/updatevote/${idcart}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    start: amount,
                }),
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

    const handleUp = () => {
        if (start < 5) {
            fecthData(e.MADG, start + 1);
            setStart((pr) => pr + 1);
        }
    };
    const handleDown = () => {
        if (start > 1) {
            fecthData(e.MADG, start - 1);
            setStart((pr) => pr - 1);
        }
    };
    return (
        <div
            key={e.MASP}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: '30px',
                backgroundColor: '#dddddd3d',
            }}
        >
            <img src={e.IMG} style={{ width: '300px' }}></img>
            <p style={{ fontSize: '30px' }}>{e.TENSP}</p>
            <div>
                <div style={{ display: 'flex' }}>
                    <button
                        className={style.btn}
                        onClick={handleDown}
                        style={{
                            display: 'block',
                            width: '50px',
                            height: '50px',

                            fontSize: '20px',
                            lineHeight: '50px',
                            margin: '0 10px',
                        }}
                    >
                        -
                    </button>

                    <p
                        style={{
                            display: 'block',
                            width: '50px',
                            height: '50px',

                            fontSize: '30px',
                            lineHeight: '50px',
                        }}
                    >
                        {start}
                    </p>
                    <img
                        style={{ width: '25px', height: '25px', marginTop: '10px' }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png"
                    ></img>
                    <button
                        className={style.btn}
                        onClick={handleUp}
                        style={{
                            display: 'block',
                            width: '50px',
                            height: '50px',

                            fontSize: '20px',
                            lineHeight: '50px',
                            margin: '0 10px',
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
function RenderReview() {
    const rv = useSelector((state) => state.RV);
    console.log(rv);
    return (
        <div>
            {rv.map((e) => (
                <RenderItem key={e.MASP} e={e}></RenderItem>
            ))}
        </div>
    );
}

export default function Review() {
    const account = useSelector((state) => state.ACC);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fecthData() {
            if (account.MAKH) {
                await fetch(`http://localhost:3000/customer/getitembought/${account.MAKH}`)
                    .then(function (value) {
                        return value.json();
                    })
                    .then(function (data) {
                        if (data.resoult.success) {
                            dispatch(review([...data.resoult.data]));
                        }
                    });
            }
        }
        fecthData();
    });

    return (
        <div style={{ width: '1320px', minHeight: '800px', overflowY: 'scroll' }}>
            <div>
                <RenderReview></RenderReview>
            </div>
        </div>
    );
}
