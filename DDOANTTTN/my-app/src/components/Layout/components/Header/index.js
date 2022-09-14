import BotHeader from './BotHeader';
import MidHeader from './MidHeader';
import TopHeader from './TopHeader';
function Header() {
    return (
        <div>
            <TopHeader></TopHeader>
            <MidHeader></MidHeader>
            <BotHeader></BotHeader>
        </div>
    );
}

export default Header;
