import { HeaderOnly } from '../components/Layout';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/register';
import Forgot from '../pages/forgotPassword';
import About from '../pages/About';
import ListOder from '../pages/OderList';
import ProductPage from '../pages/Product';
import ProductDetail from '../pages/ProductDeltail';
import Review from '../pages/review';
import AdminHome from '../pages/AdminHome';
import ProductEdit from '../pages/ProductEdit';
import AddProduct from '../pages/AddProduct';
import ProductConfirm from '../pages/ProductConfirm';
import Statistical from '../pages/Statistical';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile, layout: HeaderOnly },
    { path: '/account/login', component: Login, layout: HeaderOnly },
    { path: '/account/register', component: Register, layout: HeaderOnly },
    { path: '/account/forgot-password', component: Forgot, layout: HeaderOnly },
    { path: '/about', component: About, layout: HeaderOnly },
    { path: '/oderlist', component: ListOder, layout: HeaderOnly },
    { path: '/products', component: ProductPage },
    { path: '/reviews', component: Review, layout: HeaderOnly },
    { path: '/productdetail', component: ProductDetail, layout: HeaderOnly },
    { path: '/adminpage', component: AdminHome, layout: null },
    { path: '/productEdit', component: ProductEdit, layout: null },
    { path: '/addproduct', component: AddProduct, layout: null },
    { path: '/productconfirm', component: ProductConfirm, layout: null },
    { path: '/statistical', component: Statistical, layout: null },
];

const privateRoutes = [{ path: '/', component: Home }];

export { publicRoutes, privateRoutes };
