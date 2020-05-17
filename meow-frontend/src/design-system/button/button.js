import React from 'react';
import styled from 'styled-components';

const TYPE = {
    SOLID: 'SOLID',
    BORDER: 'BORDER'
};

const SolidButton = styled.div`
    cursor: pointer;
    color: white;
    margin: 10px 0;
    width: 175px;
    font-weight: 700;
    height: 25px;
    background: #bbbfca;
    border-radius: 10px;
    text-align: center;
    padding: 2px;
`;

const BorderButton = styled.div`
    color: #e9e8eb;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid #e9e8eb;
    border-radius: 5px;
    padding: 5px;
    user-select: none;
    cursor: pointer;
`;


export const Button = ({type, ...rest}) => {
    return type === TYPE.BORDER ? <BorderButton {...rest}/> : <SolidButton {...rest}/>;
};

Button.TYPE = TYPE;