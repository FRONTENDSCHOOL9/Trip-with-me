import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@components/style/footer.css';

function Footer() {
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const storedActiveButton = localStorage.getItem('activeButton');
    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
    }
  }, []);

  const handleButtonClick = button => {
    setActiveButton(button);
    localStorage.setItem('activeButton', button);
  };

  return (
    <footer className="footer">
      <Link
        to="/product/list"
        className={`home footButton ${activeButton === 'home' ? 'footer-isactive' : ''}`}
        onClick={() => handleButtonClick('home')}
      >
        <i className="ir">Home</i>
      </Link>
      <Link
        to="/product/add/1"
        className={`add footButton ${activeButton === 'add' ? 'footer-isactive' : ''}`}
        onClick={() => handleButtonClick('add')}
      >
        <i className="ir">Add</i>
      </Link>
      <Link
        to="/mypage"
        className={`myinfo footButton ${activeButton === 'myinfo' ? 'footer-isactive' : ''}`}
        onClick={() => handleButtonClick('myinfo')}
      >
        <i className="ir">Myinfo</i>
      </Link>
    </footer>
  );
}

export default Footer;
