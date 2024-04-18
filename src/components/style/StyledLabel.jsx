import styled from 'styled-components';

const StyledLabel = styled.div`
  .label {
    width: 110px;
    height: 34px;
    padding: 4px;
    cursor: pointer;
    display: inline-block;
    border: 2px solid #d0d0d0;
    border-radius: 10px;
    overflow: hidden;
    color: rgb(88, 88, 88);
  }

  .input[type='checkbox']:checked + label {
    border-color: #68a9ed;
    color: black;
    font-weight: 500;
  }

  .input[type='checkbox']:hover + label {
    border-color: rgba(128, 128, 128, 0.122);
    background-color: rgba(128, 128, 128, 0.122);
    color: black;
    font-weight: 500;
    transition: 0.3s;
  }

  .input[type='checkbox'] {
    display: none;
  }
`;
export default StyledLabel;
