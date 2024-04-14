import '@components/style/footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="foot">
      <button className="home footButton">
        <i className="ir">Home</i>
      </button>
      <button className="add footButton">
        <i className="ir">Add</i>
      </button>
      <Link to="/mypage" className="myinfo footButton">
        <i className="ir">Myinfo</i>
      </Link>
    </div>
  );
}

export default Footer;
