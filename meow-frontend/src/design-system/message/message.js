import styled from "styled-components";
import React from 'react';

const Container = styled.div` 
    max-height: calc(100vh - 140px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    background-color: #fdfdff;
    
    &::-webkit-scrollbar {
        display: none;
    }
`;

const POSITION = {
    Left: 'Left',
    Right: 'Right',
};

const MessageGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    align-items: ${({align}) => align === POSITION.Right ? 'flex-end' : 'flex-start'};
`;

const MessageAuthor = styled.span`
    margin: 0;
    color: #495464;
    font-weight: 300;
    text-transform: capitalize;
`;

const MessageText = styled.p`
    display: inline-block;
    color: #555860;
    font-weight: 100;
    padding: 5px 10px;
    background: #e9e8eb;
    border-radius: 7.5px;
    min-width: 150px;
    max-width: 250px;
    box-shadow: 0 1px 0.5px rgba(0,0,0, 0.13);
    margin: 0;
`;

const Item = ({author, align, children}) => (
    <MessageGroup align={align}>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageText>{children}</MessageText>
    </MessageGroup>
);

export const Message = {
    Container,
    POSITION,
    Item
};