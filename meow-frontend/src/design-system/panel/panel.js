import styled from "styled-components";

export const Panel = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    width: ${({width}) => width};
    height: ${({height}) => height};
`;

const Colors = {
    Light: '#e9e8eb',
    Dark: '#bbbfca'
};

const Scheme = {
    Light: 'Light',
    Dark: 'Dark'
};

Panel.Block = styled.div`
    background-color: ${({scheme}) => Colors[scheme]};
    width: ${({width}) => width};
    height: ${({height}) => height};
`;

Panel.Scheme = Scheme;