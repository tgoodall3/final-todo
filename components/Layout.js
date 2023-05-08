import React from 'react'
import Footer from './Footer'
import Header from './Header'
import LayoutStyles from '../styles/layout.module.css'

export default function Layout(props) {
    const { children } = props
    return (
        <div className={LayoutStyles.wrapper}>
            <Header className={LayoutStyles.head}/>
            <main className={LayoutStyles.main}>
                {children}
            </main>
            <Footer className={LayoutStyles.footer}/>
        </div>
    )
}
