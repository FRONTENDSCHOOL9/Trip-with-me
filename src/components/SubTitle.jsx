import PropTypes from 'prop-types';

const SubTitle = ({ iconSrc, title }) => {
  return (
    <div className="text-lg font-bold flex mt-4 mb-2 px-1.5 py-0">
      {iconSrc && <img src={iconSrc} className="w-7 mr-1"></img>}
      <h2>{title}</h2>
    </div>
  );
};

SubTitle.propTypes = {
  iconSrc: PropTypes.string,
  title: PropTypes.string,
};

export default SubTitle;
