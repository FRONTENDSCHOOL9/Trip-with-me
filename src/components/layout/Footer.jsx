import '@components/style/footer.css';

function Footer() {
  return (
    <div className="foot">
      <button className="home footButton">
        <i className="ir">Home</i>
      </button>
      <button className="add footButton">
        <i className="ir">Add</i>
      </button>
      <button className="myinfo footButton">
        <i className="ir">Myinfo</i>
      </button>
    </div>
  );
}

export default Footer;
