import MidHeader from '../components/Header/MidHeader';
import TopHeader from '../components/Header/TopHeader';
function DefaultLayout({ children }) {
    return (
        <div>
            <header>
                <TopHeader></TopHeader>
                <MidHeader></MidHeader>
            </header>

            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
