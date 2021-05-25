import styled from "styled-components"
import Link from 'next/link';

export function Header(){
    return (
        <div className="buttonsContainer">
            <div className="buttons">
                <Link href="/">
                    <a>Visualizar</a>
                </Link>
                <Link href="/NewRegister">
                    <a>Novo Cadastro</a>
                </Link>
            </div>
        </div>
    )
}