import React from 'react';
import styled from 'styled-components';


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 250px;
    color: black;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.75);
`;

Form.Input = styled.input`
    font-size: 17px;
    border-width: 0 0 2px 0;
    padding-bottom: 5px;
    margin: 5px 0;
`;

const ErrorContainer = styled.div`
    width: 190px;
    position: relative;
`;

const ErrorMessage = styled.span`
    position:absolute;
    color: #ff9494;
`;

Form.Error = ({children}) => (
    <ErrorContainer>
        <ErrorMessage>{children}</ErrorMessage>
    </ErrorContainer>
);