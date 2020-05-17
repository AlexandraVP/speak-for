import styled from 'styled-components';

interface PageProps {
    padded: boolean;
}

const Page = styled.div<PageProps>`
  display: flex;
  justify-content: center;
  align-items: ${({padded}) => padded ? 'flex-start' : 'center'};
  height: 100vh;
  align-self: flex-start;
  ${ ({padded}) => (
      padded 
          ? `align-items: flex-start;
              padding-top: 10%;
             `
          : 'align-items: center'
  )}  
`;

interface FlexProps {
    align?: string;
    justify?: string;
    width?: string;
    height?: string;
}

const Row = styled.div<FlexProps>`
    display: flex;
    flex-direction: row;
    ${({align}) => align ? `align-items: ${align};` : ''}
    ${({justify}) => justify ? `justify-content: ${justify};` : ''}
    ${({width}) => width ? `width: ${width};` : ''}
    ${({height}) => height ? `height: ${height};` : ''}
`;

const Column = styled.div<FlexProps>`
    display: flex;
    flex-direction: column;
    ${({align}) => align ? `align-items: ${align};` : ''}
    ${({justify}) => justify ? `justify-content: ${justify};` : ''}
    ${({width}) => width ? `width: ${width};` : ''}
    ${({height}) => height ? `height: ${height};` : ''}
`;

const Wrapper = styled.div`
    padding: 10px;
`;

export const Layout = {
    Page,
    Row,
    Column,
    Wrapper
};