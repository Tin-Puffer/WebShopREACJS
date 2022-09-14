import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartItem } from '../../../../redux/actions';
import CartDeital from '../CartList';
function TotalCart() {
    const [showResults, setShowResults] = useState(false);
    const onClick = () => setShowResults((pr) => !pr);
    const account = useSelector((state) => state.ACC);
    const listCart = useSelector((state) => state.CART);
    if (account.MAKH) {
        return (
            <div>
                {showResults ? <CartDeital fn={onClick} /> : null}
                <Nav.Link onClick={onClick} style={{ padding: '0' }}>
                    {listCart.reduce((sm, e) => {
                        return sm + e.SL;
                    }, 0) +
                        ' Items-' +
                        listCart.reduce((sm, e) => {
                            return (sm += e.GIASP * e.SL);
                        }, 0) +
                        '$'}
                </Nav.Link>
            </div>
        );
    } else {
        return <Nav.Link style={{ padding: '0' }}>No Item !</Nav.Link>;
    }
}

export default function () {
    const account = useSelector((state) => state.ACC);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fecthData() {
            if (account.MAKH) {
                await fetch(`http://localhost:3000/customer/getcart${account.MAKH}`)
                    .then(function (value) {
                        return value.json();
                    })
                    .then(function (data) {
                        if (data.resoult.suscess) {
                            dispatch(cartItem([...data.resoult.res]));
                        }
                    });
            }
        }
        fecthData();
    });
    return (
        <div>
            <Container fluid="xl">
                <Row className="justify-content-md-center" fluid="lg">
                    <Navbar style={{ height: 'auto', padding: '15px' }}>
                        <Col xs={12}>
                            <div style={{ display: 'flex', justifyContent: ' space-between', alignItems: 'center' }}>
                                <div>
                                    <Link to="/" style={{ textDecoration: 'none' }}>
                                        <img
                                            style={{ height: '40px' }}
                                            src="https://vietartproductions.com/wp-content/uploads/2022/05/logo-cong-ty-co-khi-ctv.png"
                                        ></img>
                                    </Link>
                                </div>
                                <div>
                                    <Nav className="me-auto">
                                        <p>Welcome to our Online Store!</p>
                                        <p style={{ margin: ' 0 5px', color: 'red' }}> CART:</p>

                                        <TotalCart></TotalCart>
                                    </Nav>
                                </div>
                            </div>
                        </Col>
                    </Navbar>
                </Row>
            </Container>
        </div>
    );
}
