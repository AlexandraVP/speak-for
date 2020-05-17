import styled from 'styled-components';

const ICON = {
    Login: 'Login',
    Register: 'Register',
    Trademark: 'Trademark'
};

const icons = {
    [ICON.Register]: 'https://i.ibb.co/YBZWrsk/2020-05-16-20-47-44.png',
    [ICON.Login]: 'https://i.ibb.co/9VYNtZ0/2020-05-16-20-48-45.png',
    [ICON.Trademark]: 'https://i.ibb.co/nmwzdgr/speak-for-title.png'
};

const SIZE = {
    L: 'L',
    M: 'M'
};

export const Logo = styled.div`
    background: url(${({icon}) => icons[icon]}) 100%;
    ${({size}) => (
        size === SIZE.M
        ? `
              width: 80px;
              height: 60px;
          `
        : `
             width: 200px;
             height: 150px;
        `
    )}
    background-repeat:no-repeat;
    background-size:cover;
`;

Logo.ICON = ICON;
Logo.SIZE = SIZE;