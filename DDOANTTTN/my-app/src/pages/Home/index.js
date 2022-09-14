import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import style from './Home.module.css';
import { useEffect, useState } from 'react';
import { cartItem, resproduct } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Itemcard({ value }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carList = useSelector((state) => state.CART);
    const user = useSelector((state) => state.ACC);
    console.log(user.ADMIN);
    async function addCartDB() {
        await fetch(`http://localhost:3000/customer/updatecart${user.MAKH}`, {
            method: 'POST',
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
        console.log(carList);
        addCartDB();
        if (carList.findIndex((x) => x.MASP === value.MASP) !== -1) {
            const newArr = [...carList];
            newArr[carList.findIndex((x) => x.MASP === value.MASP)].SL += 1;
            dispatch(cartItem(newArr));
        } else {
            dispatch(
                cartItem([
                    ...carList,
                    {
                        IMG: value.IMG,
                        MASP: value.MASP,
                        TENSP: value.TENSP,
                        SL: 1,
                        GIASP: value.GIASP,
                    },
                ]),
            );
        }
    };
    function handleClickLable(value) {
        window.localStorage.setItem('MASP', value.MASP);
        if (!user.ADMIN) {
            dispatch(resproduct(['DELTAIL']));
            navigate(`/productdetail`);
        } else {
            navigate(`/productedit`);
        }
    }
    return (
        <Col xs={3}>
            <div
                onClick={() => {
                    handleClickLable(value);
                }}
            >
                <div className={style.card}>
                    <img src={value.IMG} alt="" />
                    <div className={style.content}>
                        <p style={{ fontSize: '14px' }}>{value.TENSP}</p>
                        <div className={style.containerPrice}>
                            <p>Price:</p>
                            <p>{value.GIASP}$</p>
                        </div>
                        <div style={{ display: 'flex', width: '100$', justifyContent: 'center' }}>
                            <p>Start Rating : </p>
                            {value.VOTE || 0}
                            <img
                                style={{ width: '25px', height: '25px', marginLeft: '5px', marginTop: '2px' }}
                                src={
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png'
                                }
                            ></img>
                        </div>
                        <div className={style.price}>
                            {user.ADMIN || <button onClick={addToCart}> ADD TO CART </button>}
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}
function ItemCategory({ value }) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    function handleClickCategory(e) {
        dispatch(resproduct([e]));
        navigate(`/products`);
    }
    return (
        <Col xs={3}>
            <div className={style.containerCategory} style={{ position: 'relative', marginBottom: '30px' }}>
                <img style={{ width: '100%' }} src="https://i.ytimg.com/vi/-yQXfZLxEe8/maxresdefault.jpg"></img>
                <p
                    onClick={() => handleClickCategory(value.LOAI)}
                    style={{
                        position: 'absolute',
                        top: '40%',
                        left: '15%',
                        color: 'white',
                        fontSize: '30px',
                        textShadow: 'rgba(0,0,255,1) -1px -2px 0.5em',
                        fontWeight: 'bold',
                    }}
                >
                    {value.LOAI}
                </p>
            </div>
        </Col>
    );
}
function CategoryCard(props) {
    return (
        <Container fluid="xl">
            <Row className="justify-content-md-center" fluid="lg" style={{ paddingBottom: '10px' }}>
                <div style={{ height: '50px', display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ lineHeight: '50px', margin: '0' }}>{props.title || 'title'}</h3>
                </div>
            </Row>
            <Row>
                {props.dta.map((e) => (
                    <ItemCategory key={e.LOAI} value={e}></ItemCategory>
                ))}
            </Row>
        </Container>
    );
}
export function HomeItem(props) {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(resproduct([e.target.id]));
    };

    return (
        <div style={{ paddingBottom: '40px' }}>
            <Container fluid="xl">
                <Row className="justify-content-md-center" fluid="lg" style={{ paddingBottom: '10px' }}>
                    <div style={{ height: '50px', display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ lineHeight: '50px', margin: '0' }}>{props.title || 'title'}</h3>
                        <Link style={{ lineHeight: '50px', margin: '0' }} to="/products">
                            <p id={1} onClick={handleClick} style={{ margin: '0' }}>
                                See More
                            </p>
                        </Link>
                    </div>
                </Row>
                <Row>
                    {props.dta.map((e) => (
                        <Itemcard key={e.MASP} value={e}></Itemcard>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
function Home() {
    const [fnew, setFnew] = useState([]);
    const [fcate, setCate] = useState([]);
    const [fvote, setVote] = useState([]);
    useEffect(() => {
        async function fecthDataNEW() {
            await fetch(`http://localhost:3000/product/rs1`)
                .then(function (value) {
                    return value.json();
                })
                .then(function (data) {
                    if (data.resoult.success) {
                        setFnew([...data.resoult.data]);
                    }
                });
        }
        async function fecthDataVOTE() {
            await fetch(`http://localhost:3000/product/rs3`)
                .then(function (value) {
                    return value.json();
                })
                .then(function (data) {
                    if (data.resoult.success) {
                        setVote([...data.resoult.data]);
                    }
                });
        }
        async function fecthDataCATE() {
            await fetch(`http://localhost:3000/product/rs2`)
                .then(function (value) {
                    return value.json();
                })
                .then(function (data) {
                    if (data.resoult.success) {
                        setCate([...data.resoult.data]);
                    }
                });
        }
        fecthDataNEW();
        fecthDataCATE();
        fecthDataVOTE();
    }, []);
    return (
        <div>
            <HomeItem title={'New Product'} dta={[...fnew]}></HomeItem>
            <CategoryCard title={'Featured category'} dta={[...fcate]}></CategoryCard>
            <HomeItem title={'Height Rating Product'} dta={[...fvote]}></HomeItem>
        </div>
    );
}
export default Home;
