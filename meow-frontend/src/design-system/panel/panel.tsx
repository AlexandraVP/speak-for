import styled from "styled-components";

interface BoxProps {
    width?: string;
    height?: string;
}

const Card = styled.div<BoxProps>`
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    ${({width}) => width ? `width: ${width};` : ''}
    ${({height}) => height ? `height: ${height};` : ''}
`;

enum Color  {
    Light= 'Light',
    Dark='Dark'
}

const colors = {
    [Color.Light]: '#e9e8eb',
    [Color.Dark]: '#bbbfca'
};

interface ColoredBox extends BoxProps{
    color: Color;
}

const Block = styled.div<ColoredBox>`
    background-color: ${({color}) => colors[color]};
    ${({width}) => width ? `width: ${width};` : ''}
    ${({height}) => height ? `height: ${height};` : ''}
`;

export const Panel = {
    Card,
    Block,
    Color
};