import '@components/style/footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="foot">
      <Link to="/product/list" className="home footButton">
        <i className="ir">Home</i>
      </Link>
      <Link to="/product/add" className="add footButton">
        <i className="ir">Add</i>
      </Link>
      <Link to="/mypage" className="myinfo footButton">
        <i className="ir">Myinfo</i>
      </Link>
    </div>
  );
}

export default Footer;
