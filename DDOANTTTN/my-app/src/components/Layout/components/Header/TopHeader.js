import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from './Heading.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, allProduct, deltaiPoduct, review } from '../../../../redux/actions';
import { cartItem } from '../../../../redux/actions';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from 'react';
function Loginacc(props) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem('user')) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            dispatch(
                login({
                    TEN: user.TEN,
                    MAKH: user.MAKH,
                    IMG: user.IMG,
                    ADMIN: user.ADMIN,
                    LOGIN: user.LOGIN,
                }),
            );
        }
    }, []);
    if (!props.value.LOGIN) {
        return (
            <Nav className="me-auto">
                <Link to="/account/register">Rrgister</Link>
                <Link to="/account/login">Login</Link>
            </Nav>
        );
    } else {
        if (!props.value.ADMIN) {
            let linkImg = 'http://localhost:3000/file';
            if (props.value.IMG) {
                linkImg += props.value.IMG;
            } else {
                linkImg = 'http://localhost:3000/filedefault.jpg';
            }
            return (
                <>
                    <img style={{ borderRadius: '50%' }} src={linkImg} alt="avt" width="35" height="35" />
                    <NavDropdown id="nav-dropdown-dark-example" title={props.value.TEN}>
                        <NavDropdown.Item onClick={props.fn2}>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={props.fn3}>My Oder</NavDropdown.Item>
                        <NavDropdown.Item onClick={props.fn4}>My Review</NavDropdown.Item>
                        <NavDropdown.Item onClick={props.fn}>Log-out</NavDropdown.Item>
                    </NavDropdown>
                </>
            );
        } else if (props.value.ADMIN) {
            navigate(`/adminpage`);
        }
    }
}

export default function () {
    const dispatch = useDispatch();
    const logined = useSelector((state) => state.ACC);
    let navigate = useNavigate();
    const handleProfile = () => {
        navigate(`/profile`);
    };
    const handleOder = () => {
        navigate(`/oderlist`);
    };
    const hanldeRevew = () => {
        navigate(`/reviews`);
    };
    const handelLogout = () => {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('MASP');
        window.localStorage.removeItem('prd');
        dispatch(
            login({
                TAIKHOAN: '',
                TEN: '',
                MAKH: '',
                LOGIN: false,
            }),
        );
        dispatch(cartItem([]));
        dispatch(review([]));
        navigate(`/`);
    };
    return (
        <div>
            <Container fluid="xl">
                <Row className="justify-content-md-center" fluid="lg">
                    <Navbar className={style.boderbottom}>
                        <Col className={style.rightTo} xs={7} sm={9} md={10}>
                            <p className={style.help}>Need Help?</p>
                            <p className={style.call}>Call us</p>
                            <Navbar.Brand href="#home">
                                <p className={style.smallNav}>1-22-3456789</p>
                            </Navbar.Brand>
                        </Col>
                        <Col className={style.rightTo} xs={5} sm={3} md={2}>
                            <Loginacc
                                value={logined}
                                fn={handelLogout}
                                fn2={handleProfile}
                                fn3={handleOder}
                                fn4={hanldeRevew}
                            ></Loginacc>
                        </Col>
                    </Navbar>
                </Row>
            </Container>
        </div>
    );
}
