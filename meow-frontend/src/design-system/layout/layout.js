import styled from 'styled-components';

export const Layout = styled.div`
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

Layout.Row = styled.div`
    display: flex;
    flex-direction: row;
    ${({align}) => align ? `align-items: ${align};` : ''}
    ${({justify}) => justify ? `justify-content: ${justify};` : ''}
    ${({width}) => width ? `width: ${width};` : ''}
    ${({height}) => height ? `height: ${height};` : ''}
`;

Layout.Column = styled.div`
    display: flex;
    flex-direction: column;
    ${({align}) => align ? `align-items: ${align};` : ''}
    ${({justify}) => justify ? `justify-content: ${justify};` : ''}
    ${({width}) => width ? `width: ${width};` : ''}
    ${({height}) => height ? `height: ${height};` : ''}
`;

Layout.Wrapper = styled.div`
    padding: 10px;
`;