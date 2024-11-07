import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
            <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            <Link to="/candidatos" style={{ color: 'white', textDecoration: 'none' }}>Candidatos</Link>
            <Link to="/vagas" style={{ color: 'white', textDecoration: 'none' }}>Vagas</Link>
        </nav>
    );
};

export default Navbar;