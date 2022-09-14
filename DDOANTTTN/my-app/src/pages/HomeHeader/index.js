import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function () {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        navigate(`/adminpage`);
    };
    const handleClickAdd = () => {
        navigate(`/addproduct`);
    };
    const handleClickConfirm = () => {
        navigate(`/productconfirm`);
    };
    const handleClickStatistical = () => {
        navigate(`/statistical`);
    };

    function handleLogout() {
        window.localStorage.removeItem('user');
        dispatch(
            login({
                TAIKHOAN: '',
                TEN: '',
                ADMIN: false,
                LOGIN: false,
            }),
        );
        navigate(`/`);
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    {' '}
                    <p onClick={handleClick} style={{ margin: '0' }}>
                        Produt
                    </p>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>
                        <p onClick={handleClickAdd} style={{ margin: '0' }}>
                            Add New Product
                        </p>
                    </Nav.Link>
                    <Nav.Link>
                        <p onClick={handleClickConfirm} style={{ margin: '0' }}>
                            Order confirmation
                        </p>
                    </Nav.Link>

                    <Nav.Link>
                        <p onClick={handleClickStatistical} style={{ margin: '0' }}>
                            Statistical
                        </p>
                    </Nav.Link>
                </Nav>
                <button onClick={() => handleLogout()} style={{ height: '100%' }}>
                    LOG-OUT
                </button>
            </Container>
        </Navbar>
    );
}
