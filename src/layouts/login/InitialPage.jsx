import React from 'react';

const InitialPage = (props) => {
    const { children } = props
    return (
        <>
            <p>Aca iria el navbar antes del logueo xd</p>
            <div> {children}</div>
        </>
    );
};

export default InitialPage;
