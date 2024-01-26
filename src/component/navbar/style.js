import { styled } from "styled-components";

export const Header = styled.header`
    background-color: rgb(33, 37, 41);
    color: white;
    width: 100%;
    padding: 20px;
    padding-bottom: 0;
    display: grid;
    grid-template-columns: 220px 1fr;
`

export const Div = styled.div`
    display: flex;
    justify-content: space-around;
    cursor: pointer;
`
export const Logo = styled.div`
    position: relative;
    color: white;
    transform: translate(-15px,-18px);
    font-size: 3rem;
    transition: .5s color, .5s background;
`

export const Logoaftet = styled.div`
    content: "eg";
    width: 5px;
    height: 5px;
    position: absolute;
    top: 25px;
    right: -8px;
    font - size: 1.5rem;
    letter - spacing: 2px;
    text - transform: lowercase;
`

export const Paragraph = styled.p`
    font-size: 1rem;
`

export const Paragraphhover = styled.p`
    color: goldenrod;
`

export const Nav = styled.nav`
    display: grid;
    grid-template-columns: 1fr 100px 100px 100px 100px 100px;
`

export const Button = styled.button`
    background-color: grey;
    width: 7%;
    height: 40px;
    font-size: 1.3rem;
    border: none;
`

export const Input = styled.input`
    width: 83%;
    height: 40px;
    font-size: 1.3rem;
`

export const I = styled.i`
    width: 7%;
    height: 40px;
    background-color: goldenrod;
    padding: 11px;
`

export const Linkhref = styled.a`
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: .5s color;
    padding: 5px;

    &:hover{
        color: goldenrod;
    }
`

export const Linkhrefhover = styled.a`
    color: goldenrod;

`

export const Home = styled.section`
    padding: 5px 10px;
    background-color: rgb(54, 59, 65);
    & .Home .a{
        margin-right: 10px;
    }
`
export const Homelink = styled.a`
    margin-right: 10px;
`