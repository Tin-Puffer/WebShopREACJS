import Product from '../Product';
import HomeHeader from '../HomeHeader';
import { useDispatch } from 'react-redux';
import { resproduct, login } from '../../redux/actions';

export default function () {
    const dispatch = useDispatch();
    dispatch(resproduct([1]));
    dispatch(login(localStorage.getItem('user')));
    return (
        <div style={{ width: '1320px', height: '950px', backgroundColor: 'white' }}>
            <HomeHeader></HomeHeader>
            <Product></Product>
        </div>
    );
}
