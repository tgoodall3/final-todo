import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import homeStyles from '../styles/home.module.css'

export default function Header() {
    const { currentUser, logout } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef()
    const iconRef = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && iconRef.current && !dropdownRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={homeStyles.wrapper}>
            <h1 className={homeStyles.header}>TODO</h1>
            {currentUser && (
                <div className='relative' ref={iconRef}>
                    <i onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={homeStyles.login}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg></i>
                    {isDropdownOpen && (
                        <div className={homeStyles.drop} ref={dropdownRef}>
                            <div onClick={handleLogout} className={homeStyles.logout}>Logout</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
