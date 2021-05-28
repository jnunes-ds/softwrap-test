import Link from 'next/link';
import { useState } from 'react';

export function Header(){
    const [showMenu, setShowMenu] = useState(true);
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