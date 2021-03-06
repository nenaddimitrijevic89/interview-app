import React from 'react';
import style from './Footer.module.css';
import { Navbar } from 'react-materialize';

const Footer = () => {

    const loginForm = window.location.pathname;
    if (loginForm === '/admin') {
        return null
    }

    return (
        <Navbar
            className={`${style.footer} justify-content-center`}
            menuIcon={<div className={style.display}></div>}
            brand={<span className={style.name}>&copy; 2020, by Nenad</span>}>
        </Navbar>
    )
}

export { Footer }