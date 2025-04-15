import './styles.css';

export function Navbar() {
    return (
        <header className="navbar">
            <div className="search">
                <input type="search" placeholder="Buscar..." />
            </div>
            <div className="user-menu">
                <span>Bem-vindo(a)</span>
            </div>
        </header>
    );
}
