import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { resproduct } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function TopBody() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleClick = (e) => {
        e.stopPropagation();
        dispatch(resproduct([e.target.id]));
        navigate(`/products`);
    };
    return (
        <Container fluid="xl" style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Row className="justify-content-md-center" fluid="sm">
                <Col sm={4} lg={4} style={{ padding: '0' }}>
                    <ListGroup style={{ borderRadius: '0' }}>
                        <ListGroup.Item>CATEGORY</ListGroup.Item>
                        <ListGroup.Item variant="dark" action>
                            <p id={1} onClick={handleClick} style={{ margin: '0' }}>
                                Tất Cả Sản Phẩm
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" action>
                            <p id={'máy phay cnc'} onClick={handleClick} style={{ margin: '0' }}>
                                Máy PHAY CNC
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" action>
                            <p id={'máy khoan cần nc'} onClick={handleClick} style={{ margin: '0' }}>
                                Máy Khoan Cần CNC
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" action>
                            <p id={'máy cắt plasma'} onClick={handleClick} style={{ margin: '0' }}>
                                Máy cắt PLASMA
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" action>
                            <p id={'máy mài phẳng'} onClick={handleClick} style={{ margin: '0' }}>
                                Máy mài Phẳng
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" action>
                            <p id={'máy cưa vòng'} onClick={handleClick} style={{ margin: '0' }}>
                                Máy Cưa Vòng
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item variant="dark" action>
                            <p id={'máy xung điện'} onClick={handleClick} style={{ margin: '0' }}>
                                Máy Xung Điện
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={8} lg={8} style={{ padding: '0 5px' }}>
                    <Carousel>
                        <Carousel.Item style={{ height: '329px', width: '100%' }}>
                            <img
                                className="d-block "
                                src="https://vfegroup.vn/wp-content/uploads/2021/03/vfe-du-hoc-phap-nganh-co-khi-754x400.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item style={{ height: '329px', width: '100%' }}>
                            <img
                                className="d-block "
                                src="https://cdn.123job.vn/123job/uploads/2022/02/28/2022_02_28______f6675ede7d4bdb3862ece82d73b36f18.jpg"
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item style={{ height: '329px', width: '100%' }}>
                            <img
                                className="d-block "
                                src="https://cachdung.com/image/data/an%20to%C3%A0n%20v%E1%BA%ADn%20h%C3%A0nh%20cnc.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default TopBody;
