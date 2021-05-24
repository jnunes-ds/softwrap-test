import styled from "styled-components";


export default function Button({name, onClick}){
    return (
        <StyledButton onClick={onClick}>
            {name}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    
`;