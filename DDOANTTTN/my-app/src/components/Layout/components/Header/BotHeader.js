import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from './Heading.module.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resproduct } from '../../../../redux/actions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function () {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleClick = (e) => {
        dispatch(resproduct([e.target.id]));
    };
    const handleClickSearch = () => {
        if (input) {
            dispatch(resproduct(['-' + input.trim().toUpperCase()]));
            setInput('');
            navigate(`/products`);
        }
    };
    return (
        <Container fluid="xl">
            <Row className="justify-content-md-center" fluid="sm">
                <Navbar style={{ borderRadius: '10px' }} collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link style={{ textDecoration: 'none' }} to="/profile"></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className={style.Navlinkcss} style={{ marginLeft: '15px' }} to="/">
                                HOME
                            </NavLink>
                            <NavLink className={style.Navlinkcss} to="/products">
                                <p id={1} onClick={handleClick} style={{ margin: '0' }}>
                                    ALL PRODUCT
                                </p>
                            </NavLink>
                            <NavLink className={style.Navlinkcss} to="/about">
                                ABOUT
                            </NavLink>
                            <NavLink className={style.Navlinkcss} to="/about">
                                NEW
                            </NavLink>
                            <NavLink className={style.Navlinkcss} to="/about">
                                CONTACT
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>

                    <Col sm={12} lg={4}>
                        <InputGroup className="mb-1">
                            <Form.Control
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Search Product"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button
                                onClick={handleClickSearch}
                                className={style.maginLR}
                                variant="outline-secondary"
                                id="button-addon2"
                            >
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                </Navbar>
            </Row>
        </Container>
    );
}
