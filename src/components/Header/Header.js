import React from 'react';
import { Navbar, NavItem } from 'react-materialize';
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import { storageService } from '../../services/StorageService';

const Header = ({ isHomePage }) => {

    const logOut = () => {
        const answer = prompt("Are you sure? Answer with yes or no!");
        if (answer === "yes") {
            storageService.logOut()
        }
    }

    return (
        <Navbar
            alignLinks="right"
            className={style.back}
            brand={isHomePage ? <a className="brand-logo">Interview App</a> : <a className={`brand-logo ${style.navName}`}>Interview Reports</a>}
            centerChildren
            id="mobile-nav"
            menuIcon={<><div className={style.menu}></div><div className={style.menu}></div><div className={style.menu}></div></>}
            options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
            }}
        >{isHomePage ? <div className={style.nav}><Link to="/admin"><NavItem>Login</NavItem></Link>
            <Link to="/admin/reports"><NavItem>Reports</NavItem></Link></div>
            : <div className={style.nav}><Link to="/admin/createreport"><NavItem>Create Report</NavItem></Link>
                <Link to="/admin/reports"><NavItem onClick={logOut}>Logout</NavItem></Link></div>}
        </Navbar>
    )
}

export { Header };