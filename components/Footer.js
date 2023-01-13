import React from 'react'
import classes from '../styles/Footer.module.scss'
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.icons}>
                <ul>
                    <li id='github'><a className={classes.link} title='Github' href='https://google.com' target="_blank" rel="noopener noreferrer"><i><FaInstagram /></i></a></li>

                    <li id='github'><a className={classes.link} title='Github' href='https://google.com' target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer