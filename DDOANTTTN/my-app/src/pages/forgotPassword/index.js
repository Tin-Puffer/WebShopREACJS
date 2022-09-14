import { useNavigate } from 'react-router-dom';
import style from '../Login/login.module.css';
import { useState } from 'react';
function Forgot() {
    const [email, setEmail] = useState('');
    const [sdt, setSdt] = useState('');
    const data = {
        SDT: sdt,
        EMAIL: email,
    };
    let navigate = useNavigate();
    const handleClick = async function () {
        await fetch('http://localhost:3000/customer/resetpassword', {
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
                    navigate(`/account/login`);
                }
            });
    };
    return (
        <div className={style.container}>
            <h2>Reset Password</h2>
            <form>
                <img
                    style={{ width: '500px', maxHeight: '170px' }}
                    src="https://cokhitronghoang.com/wp-content/uploads/2017/04/sua-chua-chi-tiet-may-750x440.jpg"
                ></img>
            </form>
            <form style={{ width: '100%', marginTop: '40px' }}>
                <div className={style.group}>
                    <input
                        type="text"
                        required
                        value={sdt}
                        onChange={(e) => {
                            setSdt(e.target.value);
                        }}
                    />
                    <span className={style.highlight}></span>
                    <span className={style.bar}></span>
                    <label>Phone Number</label>
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
                    <label>Email</label>
                </div>
            </form>

            <div>
                <button onClick={handleClick} className={style.button64} role="button">
                    <span className={style.text}>Confirm</span>
                </button>
            </div>
        </div>
    );
}
export default Forgot;
