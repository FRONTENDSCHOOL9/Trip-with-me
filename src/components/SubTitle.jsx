import PropTypes from 'prop-types';

const SubTitle = ({ iconSrc, title }) => {
  return (
    <div className="subTitleBox">
      {iconSrc && <img src={iconSrc} className="img-heart"></img>}
      <h2 className="likeTitle">{title}</h2>
    </div>
  );
};

SubTitle.propTypes = {
  iconSrc: PropTypes.string,
  title: PropTypes.string,
};

export default SubTitle;
