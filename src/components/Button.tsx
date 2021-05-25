import styled from "styled-components";

interface ButtonProps{
    name: string;
    onClick?: VoidFunction;
}

export default function Button({name, onClick}: ButtonProps){
    return (
        <div>
            <StyledButton onClick={onClick}>
                {name}
            </StyledButton>
        </div>
    );
}

const StyledButton = styled.button`
    border: 1px solid #E8E8E8;
    border-radius: 10px;
    background-color: #FFF;
    padding: .75rem;
    margin: .5rem;
    font-size: 15px;

    :hover{
        background-color: blue;
        color: #FFF;
        border: transparent;
        cursor: pointer;
    }
`;