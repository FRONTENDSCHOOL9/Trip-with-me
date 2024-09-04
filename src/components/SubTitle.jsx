import PropTypes from 'prop-types';

const SubTitle = ({ iconSrc, title, iconAlt }) => {
  return (
    <div className="text-lg font-bold flex mb-2 px-1.5 py-0 font-notosans">
      {iconSrc && <img src={iconSrc} alt={iconAlt} className="w-7 mr-1"></img>}
      <h2>{title}</h2>
    </div>
  );
};

SubTitle.propTypes = {
  iconSrc: PropTypes.string,
  title: PropTypes.string,
  iconAlt: PropTypes.string,
};

export default SubTitle;
