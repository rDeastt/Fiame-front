import React from 'react';
import './clientList.css';

export const SearchBar = ({ setSearchTerm }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Búsqueda"
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

