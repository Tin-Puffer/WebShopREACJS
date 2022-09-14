import { useState } from 'react';
import HomeHeader from '../HomeHeader';
import { useNavigate } from 'react-router-dom';

export default function () {
    const [ten, setTen] = useState('');
    const [gia, setgia] = useState('');
    const [anh1, setanh1] = useState('');
    const [anh2, setanh2] = useState('');
    const [baohanh, setbaohanh] = useState('');
    const [xuatxu, setxuatxu] = useState('');
    const [loai, setloai] = useState('');
    const navigate = useNavigate();
    const handleAddproduct = () => {
        fetch(`http://localhost:3000/product/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IMG: anh1,
                TENSP: ten,
                GIASP: gia,
                XUATXU: xuatxu,
                BAOHANH: baohanh,
                LOAI: loai,
                TSIMG: anh2,
            }),
        })
            .then((response) => response.json())
            .then((returnValue) => {
                navigate(`/adminpage`);
            });
    };
    return (
        <div style={{ width: '1320px', height: '950px', backgroundColor: 'white' }}>
            <HomeHeader></HomeHeader>
            <div></div>
            <div className="col-lg-8" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="right-side-pro-detail border p-3 m-0">
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{ minWidth: '300px', minHeight: '300px' }}>
                                <img src="https://inboundmarketing.vn/wp-content/uploads/2020/06/4-chien-luoc-hieu-qua-cho-san-pham-cua-doanh-nghiep5.jpg" />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <p style={{ margin: '0', fontSize: '16px', color: 'gray' }}>NAME PRODUCT:</p>
                            <input
                                style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
                                type="text"
                                value={ten}
                                onChange={(e) => {
                                    setTen(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="col-lg-12">
                            <p style={{ margin: '0', fontSize: '16px', color: 'gray' }}>PRICE</p>
                            <input
                                style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
                                type="number"
                                value={gia}
                                onChange={(e) => {
                                    setgia(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="col-lg-12">
                            <p style={{ margin: '0', fontSize: '16px', color: 'gray' }}>IMAGE PRODUCT</p>
                            <input
                                style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
                                type="text"
                                value={anh1}
                                onChange={(e) => {
                                    setanh1(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="col-lg-12">
                            <p style={{ margin: '0', fontSize: '16px', color: 'gray' }}>IMAGE DECRIPT</p>
                            <input
                                style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
                                type="text"
                                value={anh2}
                                onChange={(e) => {
                                    setanh2(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="col-lg-12">
                            <p style={{ margin: '0', fontSize: '16px', color: 'gray' }}>ORIGIN OF</p>
                            <input
                                style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
                                type="text"
                                value={xuatxu}
                                onChange={(e) => {
                                    setxuatxu(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="col-lg-12">
                            <p style={{ margin: '0', fontSize: '16px', color: 'gray' }}>CATEGORY</p>
                            <input
                                style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
                                type="text"
                                value={loai}
                                onChange={(e) => {
                                    setloai(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="col-lg-12">
                            <p style={{ margin: '0', fontSize: '16px', color: 'gray' }}>INSURANCE</p>
                            <input
                                style={{ margin: '10px', marginLeft: 'auto', marginRight: 'auto' }}
                                type="number"
                                value={baohanh}
                                onChange={(e) => {
                                    setbaohanh(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="col-lg-12">
                            <button type="button" onClick={handleAddproduct}>
                                CONFRIM
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
