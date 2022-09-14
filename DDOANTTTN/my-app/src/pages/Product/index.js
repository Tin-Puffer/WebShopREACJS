import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { allProduct } from '../../redux/actions';
import { Itemcard } from '../Home/index';
import { useDispatch, useSelector } from 'react-redux';
import style from './Product.module.css';

function RenderProductAll({ sort }) {
    const PRDall = useSelector((state) => state.PRA);
    const PagesTotal = Math.ceil(PRDall.length / 20);
    const [pageNumber, setPageNumber] = useState(0);
    const arrRD = [];
    const arrPage = [];
    if (sort !== 0) {
        if (sort == 1) {
            PRDall.sort(function (a, b) {
                return a.GIASP - b.GIASP;
            });
        } else if (sort == 2) {
            PRDall.sort(function (a, b) {
                return b.GIASP - a.GIASP;
            });
        }
    }
    PRDall.slice(20 * pageNumber, 20 * pageNumber + 20).map((e) => arrPage.push(e));

    for (let i = 0; i < PagesTotal; i++) {
        arrRD.push(i);
    }
    const handleClickPage = (e) => {
        setPageNumber(e);
    };
    return (
        <div>
            <Row style={{ marginBottom: '40px' }}>
                {arrPage.map((e) => (
                    <Col xs={3} style={{ marginTop: '35px', display: 'flex' }} key={e.MASP}>
                        <Itemcard style={{ marginTop: '20px' }} value={e}></Itemcard>
                    </Col>
                ))}
            </Row>
            <Row style={{ paddingBottom: '40px' }}>
                <div className={style.pagination}>
                    {arrRD.map((e) => {
                        if (e == pageNumber)
                            return (
                                <p key={e} className={style.active}>
                                    {e + 1}
                                </p>
                            );
                        else
                            return (
                                <p key={e} onClick={() => handleClickPage(e)}>
                                    {e + 1}
                                </p>
                            );
                    })}
                </div>
            </Row>
        </div>
    );
}
export default function () {
    const dispatch = useDispatch();
    const PRDres = useSelector((state) => state.PRS);
    const [sort, setSort] = useState(0);
    // console.log(PRDres)
    async function callProduct(request) {
        await fetch('http://localhost:3000/product/allproducts', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cate: request }),
        })
            .then((response) => response.json())
            .then((returnValue) => {
                dispatch(allProduct([...returnValue.resoult.data]));
            });
    }
    useEffect(() => {
        callProduct(...PRDres);
    });

    return (
        <div style={{ width: '1320px', minHeight: '600px' }}>
            <Container fluid="xl">
                <Row>
                    <div
                        style={{
                            width: '100%',
                            height: '50px',
                            backgroundColor: '#ebebeba1',
                            display: 'flex',
                            justifyContent: 'end',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                            <p style={{ margin: '0', fontWeight: '600' }}>Price: </p>
                            <Form.Select
                                style={{ width: '200px' }}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                }}
                                value={sort}
                            >
                                <option className={style.Item} value="0">
                                    None
                                </option>
                                <option className={style.Item} value="1">
                                    Low To Height
                                </option>
                                <option className={style.Item} value="2">
                                    Height to Low
                                </option>
                            </Form.Select>
                        </div>
                    </div>
                </Row>
                <Row>
                    <RenderProductAll sort={sort}></RenderProductAll>
                </Row>
            </Container>
        </div>
    );
}
