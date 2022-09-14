import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('');
    const [image, setImage] = useState('');
    const [imageUpload, setImageUpload] = useState();
    const [prPass, setprPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPass2, setNewPass2] = useState('');
    const [sdt, setSdt] = useState('');
    const [avatar, setAvatar] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const data = {
        TEN: name,
        GIOITINH: sex,
        DIACHI: address,
        HINHANH: imageUpload || image,
    };

    const handleClick2 = async function () {
        const user = JSON.parse(window.localStorage.getItem('user'));
        if (newPass === newPass2) {
            await fetch(`http://localhost:3000/customer/update${user.MAKH}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    MATKHAU: newPass2,
                }),
            })
                .then((response) => response.json())
                .then(() => {
                    setprPass('');
                    setNewPass('');
                    setNewPass2('');
                });
        }
    };
    const handleClick = async function () {
        const user = JSON.parse(window.localStorage.getItem('user'));
        console.log(data);
        await fetch(`http://localhost:3000/customer/update${user.MAKH}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((returnValue) => {
                if (returnValue.resoult.suscess) {
                    dispatch(
                        login({
                            TEN: data.TEN,
                            IMG: data.HINHANH,
                            DiaChi: data.DIACHI,
                            MAKH: user.MAKH,
                            LOGIN: user.LOGIN,
                            ADMIN: user.ADMIN,
                        }),
                    );

                    const person = {
                        TEN: data.TEN,
                        MAKH: user.MAKH,
                        DIACHI: data.DIACHI,
                        IMG: data.HINHANH,
                        ADMIN: user.ADMIN,
                        LOGIN: user.LOGIN,
                    };

                    let formData = new FormData();
                    formData.append('file', avatar.data);
                    const response = fetch('http://localhost:3000/image', {
                        method: 'POST',
                        body: formData,
                    });
                    if (response) console.log(response.statusText);

                    window.localStorage.removeItem('user');
                    window.localStorage.setItem('user', JSON.stringify(person));
                    navigate(`/`);
                } else {
                    setMessage('DK K THANH CONG');
                }
            });
    };
    const handleChangeImage = (e) => {
        const file = {
            data: e.target.files[0],
            preview: URL.createObjectURL(e.target.files[0]),
        };

        setAvatar(file);
        setImageUpload(e.target.files[0].name);
        URL.revokeObjectURL(avatar.preview);
    };
    useEffect(() => {
        if (window.localStorage.getItem('user')) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            fetch(`http://localhost:3000/customer/profile${user.MAKH}`)
                .then(function (value) {
                    return value.json();
                })
                .then(function (value) {
                    console.log(value.resoult);
                    setName(value.resoult.TEN);
                    setAddress(value.resoult.DIACHI);
                    setEmail(value.resoult.EMAIL);
                    setSex(value.resoult.GIOITINH);
                    setSdt(value.resoult.SDT);
                    setAvatar({ priview: '' });
                    setImage(value.resoult.HINHANH || 'default.jpg');
                    setSdt(value.resoult.SDT);
                });
        }
    }, []);
    return (
        <div className="container rounded bg-white mt-5 mb-5" style={{ minHeight: '800px' }}>
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            height="150px"
                            src={avatar.preview || 'http://localhost:3000/file' + image}
                        ></img>
                        <span className="font-weight-bold">{name}</span>
                        <span className="text-black-50">{email}</span>
                        <span> </span>
                    </div>
                </div>

                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="labels"></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels"></label>
                                <Form.Group controlId="formGridState">
                                    <Form.Select
                                        onChange={(e) => {
                                            setSex(e.target.value);
                                        }}
                                        value={sex}
                                    >
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="0">Other</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className="col-md-12">
                                <label className="labels"></label>
                                <input
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    type="text"
                                    className="form-control"
                                    value={address}
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="labels"></label>
                                <Form.Control placeholder={sdt} disabled />
                            </div>
                            <div className="col-md-12">
                                <label className="labels"></label>
                                <Form.Control placeholder={email} disabled />
                            </div>
                            <div className="col-md-12">
                                <label className="labels" style={{ margin: '10px 0' }}></label>
                                <input style={{ width: '100%' }} type="file" onChange={handleChangeImage}></input>
                            </div>
                        </div>

                        <div className="mt-5 text-center">
                            <button onClick={handleClick} className="btn btn-primary profile-button" type="button">
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Password</h4>
                        </div>
                        <div className="col-md-12">
                            <label className="labels"></label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e) => setprPass(e.target.value)}
                                style={{ marginBottom: '10px' }}
                                placeholder="Current Password"
                                value={prPass}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels"></label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e) => setNewPass(e.target.value)}
                                style={{ marginBottom: '10px' }}
                                placeholder="New Password"
                                value={newPass}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="labels"></label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e) => setNewPass2(e.target.value)}
                                style={{ marginBottom: '10px' }}
                                placeholder="Confirm Password"
                                value={newPass2}
                            />
                        </div>
                        <div className="mt-5 text-center">
                            <button onClick={handleClick2} className="btn btn-primary profile-button" type="button">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;
