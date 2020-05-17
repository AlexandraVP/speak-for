import styled from "styled-components";


const Root = styled.form`
    margin-top: auto;
    height: 80px;
    background-color: #bbbfca;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TextEdit = styled.textarea`
    height: 60px;
    width: 500px;
    border-radius: 7px;
    resize: none;
    border-color: rgb(216, 216, 216);
    background-color: #fdfdff;
`;

const Submit = styled.input`
    height: 40px;
    width: 40px;
    padding: 10px;
    background-size: 90%;
    border: none;
    background-repeat: no-repeat;
    background-image: url("https://i.ibb.co/QvbRkMP/send-message-icon.png");
    filter: invert(85%);
    background-color: transparent;
    cursor: pointer;
`;

export const Controls = {
    Root,
    TextEdit,
    Submit
};