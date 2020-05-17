import styled from 'styled-components';

enum Icon  {
    Login='Login',
    Register='Register',
    Trademark='Trademark'
}

const icons = {
    [Icon.Register]: 'https://i.ibb.co/YBZWrsk/2020-05-16-20-47-44.png',
    [Icon.Login]: 'https://i.ibb.co/9VYNtZ0/2020-05-16-20-48-45.png',
    [Icon.Trademark]: 'https://i.ibb.co/nmwzdgr/speak-for-title.png'
};

enum Size {
    L='L',
    M='M'
}

interface ImgProps {
    icon: Icon;
    size: Size;
}

const Img = styled.div<ImgProps>`
    background: url(${({icon}) => icons[icon]}) 100%;
    ${({size}) => (
        size === Size.M
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

export const Logo = {
    Img,
    Icon,
    Size
};