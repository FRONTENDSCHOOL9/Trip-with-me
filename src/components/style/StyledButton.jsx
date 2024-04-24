import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonStyle = styled.button`
  background-color: ${props =>
    props.backgroundColor || '#68A9ED'}; /* Green background */
  border: none; /* Remove borders */
  color: ${props => props.color || 'white'}; /* White text */
  padding: 6px 18px; /* Padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display as inline-block */
  font-size: ${props => props.size || '16px'}; /* Font size */
  margin: 4px 2px; /* Margin */
  cursor: pointer; /* Cursor pointer */
  border-radius: 6px; /* Border radius */
  width: ${props => props.width || '100%'};
`;

const ButtonStyleBlue = styled(ButtonStyle)`
  background-color: #68a9ed;
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
Submit.propTypes = {
  children: PropTypes.string.isRequired,
};

function Button({ children, ...rest }) {
  return (
    <ButtonStyle type="button" {...rest}>
      {children}
    </ButtonStyle>
  );
}

function Submit({ children, ...rest }) {
  return (
    <ButtonStyleBlue type="submit" {...rest}>
      {children}
    </ButtonStyleBlue>
  );
}

export { Button, Submit };
