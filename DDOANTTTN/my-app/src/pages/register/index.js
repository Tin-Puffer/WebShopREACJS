import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions';
import style from '../Login/login.module.css';

function Register() {
    const [sex, setSex] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [addres, setAddres] = useState('');
    const [SDT, setSDT] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const data = {
        TEN: name,
        GIOITINH: sex,
        SDT: SDT,
        EMAIL: email,
        MATKHAU: pass1,
        DIACHI: addres,
    };
    const handleClickRS = async function () {
        if (pass1 === pass2) {
            await fetch('http://localhost:3000/customer/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((returnValue) => {
                    console.log('Success:', returnValue);
                    if (returnValue.resoult.suscess) {
                        dispatch(
                            login({
                                TEN: name,
                                MAKH: returnValue.resoult.MAKH,
                                IMG: '',
                                ADMIN: false,
                                LOGIN: true,
                            }),
                        );
                        const person = {
                            TEN: name,
                            MAKH: returnValue.resoult.MAKH,
                            IMG: '',
                            ADMIN: false,
                            LOGIN: true,
                        };
                        window.localStorage.setItem('user', JSON.stringify(person));
                        navigate(`/`);
                    } else {
                        setMessage('DK K THANH CONG');
                    }
                });
        }
    };

    return (
        <div className={style.container} style={{ width: '1320px', minHeight: '860px' }}>
            <h2>Register</h2>
            <form style={{ width: '100%', marginTop: '40px' }}>
                <div className={style.group}>
                    <input
                        type="text"
                        style={{ width: '400px' }}
                        required
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label>Full Name</label>
                    <Form.Select
                        style={{ width: '100px', position: 'absolute', left: '400px', top: '9px' }}
                        onChange={(e) => {
                            setSex(e.target.value);
                        }}
                        value={sex}
                    >
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="0">Other</option>
                    </Form.Select>
                </div>

                <div className={style.group}>
                    <input
                        type="text"
                        required
                        value={addres}
                        onChange={(e) => {
                            setAddres(e.target.value);
                        }}
                    />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label>Addres</label>
                </div>

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
                    <label>Email Addres</label>
                </div>

                <div className={style.group}>
                    <input
                        type="text"
                        required
                        value={SDT}
                        onChange={(e) => {
                            setSDT(e.target.value);
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
                        value={pass1}
                        onChange={(e) => {
                            setPass1(e.target.value);
                        }}
                    />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label>Password</label>
                </div>

                <div className={style.group}>
                    <input
                        type="password"
                        required
                        value={pass2}
                        onChange={(e) => {
                            setPass2(e.target.value);
                        }}
                    />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label>Confirm Password</label>
                </div>
            </form>

            <div>
                <button onClick={handleClickRS} className={style.button64} role="button">
                    <span className={style.text}>Sing up</span>
                </button>
            </div>
        </div>
    );
}

export default Register;
