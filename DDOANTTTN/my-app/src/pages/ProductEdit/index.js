import { useEffect, useState } from 'react';
import HomeHeader from '../HomeHeader';
import { deltaiPoduct2 } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
function RenderEditPD() {
    const navigate = useNavigate();
    const proDT2 = useSelector((state) => state.PRDT2);
    const [ten, setTen] = useState('');
    const [gia, setGia] = useState('');
    const [anh1, setAnh1] = useState('');
    const [anh2, setAnh2] = useState('');
    const [baohanh, setBaohanh] = useState('');
    useEffect(() => {
        setTen(proDT2.TENSP);
        setGia(proDT2.GIASP);
        setAnh1(proDT2.IMG);
        setAnh2(proDT2.TSIMG);
        setBaohanh(proDT2.BAOHANH);
    }, []);
    const saveProduct = () => {
        fetch(`http://localhost:3000/product/update/${proDT2.MASP}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TENSP: ten,
                GIASP: gia,
                IMG: anh1,
                TSIMG: anh2,
                BAOHANH: baohanh,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                navigate(`/adminpage`);
            });
    };

    return (
        <div style={{ display: 'inline-block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div>
                <img src={proDT2.IMG} style={{ position: 'relative', maxWidth: '700px', top: '-50%' }}></img>
            </div>
            <div style={{ display: 'inline-block', marginTop: '30px' }}>
                <p style={{ fontSize: '25px' }}> Product Deltail</p>
                <div style={{ marginTop: '15px' }}>
                    {' '}
                    productName:
                    <input
                        value={ten}
                        onChange={(e) => {
                            setTen(e.target.value);
                        }}
                    ></input>
                </div>
                <div style={{ marginTop: '15px' }}>
                    Price($):
                    <input
                        value={gia}
                        onChange={(e) => {
                            setGia(e.target.value);
                        }}
                    ></input>
                </div>
                <div style={{ marginTop: '15px' }}>
                    Product Image(LinkAdress):
                    <input
                        value={anh1}
                        onChange={(e) => {
                            setAnh1(e.target.value);
                        }}
                    ></input>
                </div>
                <div style={{ marginTop: '15px' }}>
                    Product Parameter(LinkAdress):
                    <input
                        value={anh2}
                        onChange={(e) => {
                            setAnh2(e.target.value);
                        }}
                    ></input>
                </div>
                <div style={{ marginTop: '15px' }}>
                    Insurance(month):
                    <input
                        value={baohanh}
                        onChange={(e) => {
                            setBaohanh(e.target.value);
                        }}
                    ></input>
                </div>
                <button style={{ marginTop: '30px' }} onClick={saveProduct} type="button">
                    Update Product
                </button>
            </div>
        </div>
    );
}
export default function () {
    const dispatch = useDispatch();
    async function fecthData(id) {
        await fetch(`http://localhost:3000/product/fulldetail/${id}`)
            .then(function (value) {
                return value.json();
            })
            .then(function (data) {
                if (data.resoult.success) {
                    dispatch(deltaiPoduct2(...data.resoult.data));
                }
            });
    }
    useEffect(() => {
        fecthData(window.localStorage.getItem('MASP'));
    });

    return (
        <div style={{ width: '1320px', height: '950px', backgroundColor: 'white' }}>
            <HomeHeader></HomeHeader>
            <RenderEditPD></RenderEditPD>
        </div>
    );
}
