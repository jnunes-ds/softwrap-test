import styled from "styled-components";

interface ButtonColorsProps{
    bgNormal: string;
    borderNormal: string;
    textColorNormal: string;
    bgHover: string;
    borderHover: string;
    textColorHover: string;
}
interface ButtonProps{
    name: string;
    onClick?: VoidFunction;
    color?: ButtonColorsProps;
}

const ButtonColor: ButtonColorsProps = {
    bgNormal: '#FFF',
    borderNormal: '1px solid black',
    textColorNormal: 'black',
    bgHover: 'blue',
    borderHover: 'transparent',
    textColorHover: '#FFF'
}


export default function Button({name, onClick, color=ButtonColor}: ButtonProps){
    const StyledButton = styled.button`
    border: ${color.borderNormal};
    border-radius: 10px;
    color: ${color.textColorNormal};
    background-color:${color.bgNormal};
    padding: .75rem;
    margin: .5rem;
    font-size: 15px;

    :hover{
        background-color: ${color.bgHover};
        color: ${color.textColorHover};
        border: ${color.borderHover};
        cursor: pointer;
    }
    `;


    return (
        <div>
            <StyledButton onClick={onClick}>
                {name}
            </StyledButton>
        </div>
    );
}

