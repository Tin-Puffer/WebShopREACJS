import { login } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = async function () {
        console.log('call api');
        await fetch(`http://localhost:3000/customer/login/${email}/${pass}`)
            .then(function (value) {
                return value.json();
            })
            .then(function (value) {
                if (value.resoult.suscess) {
                    if (value.resoult.admin == true)
                        dispatch(
                            login({
                                TAIKHOAN: value.resoult.TAIKHOAN,
                                TEN: value.resoult.TEN,
                                ADMIN: true,
                                LOGIN: true,
                            }),
                        );
                    else {
                        dispatch(
                            login({
                                TEN: value.resoult.TEN,
                                MAKH: value.resoult.MAKH,
                                IMG: value.resoult.HINHANH,
                                ADMIN: false,
                                LOGIN: true,
                            }),
                        );
                    }
                    const person = {
                        TEN: value.resoult.TEN,
                        MAKH: value.resoult.MAKH,
                        IMG: value.resoult.HINHANH,
                        ADMIN: value.resoult.admin,
                        LOGIN: true,
                    };
                    window.localStorage.setItem('user', JSON.stringify(person));
                    navigate(`/`);
                }
            });
    };
    const handleReset = () => {
        navigate(`/account/forgot-password`);
    };
    return (
        <div className={style.container} style={{ width: '1320px', minHeight: '860px' }}>
            <h2>LOGIN</h2>
            <form>
                <img style={{ width: '500px' }} src="http://www.cokhidanang.com/images/system/banner.png"></img>
            </form>
            <form style={{ width: '100%', marginTop: '40px' }}>
                <div className={style.group}>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label>Phone Number</label>
                </div>
                <div className={style.group}>
                    <input
                        type="password"
                        required
                        value={pass}
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                    />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label>Password</label>
                </div>
            </form>
            <p className={style.footer}>
                <a onClick={handleReset} target="_blank">
                    Fogot password
                </a>
            </p>
            <div>
                <button onClick={handleClick} className={style.button64} role="button">
                    <span className={style.text}>Sing In</span>
                </button>
            </div>
        </div>
    );
}
