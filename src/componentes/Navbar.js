import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const deslogar = () => {
        localStorage.removeItem("token")
        document.location.reload();
    }

    if (!localStorage.getItem("token"))
        return null;
    else
        return (
            <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
                <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/candidatos" style={{ color: 'white', textDecoration: 'none' }}>Candidatos</Link>
                <Link to="/vagas" style={{ color: 'white', textDecoration: 'none' }}>Vagas</Link>
                <button
                    type="button"
                    onClick={deslogar}
                    style={{
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                >
                    Logout
                </button>

            </nav>
        );
};

export default Navbar;