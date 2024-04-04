import React, { useEffect, useState } from 'react'
import { seacrhIcon } from '../../assets'

const Header = () => {
    const [showSearch, setShowSearch] = useState(false)
    return (
        <>
            <div className='header'>
                <div className='header-left'>
                    <h1>DevContra</h1>
                    <div className='search-bar'>
                        <input type="text" placeholder='Search by company, title, or location' />
                        <button>Search</button>
                    </div>
                </div>
                <div className='header-right'>
                    <button onClick={() => { setShowSearch(!showSearch) }}>
                        <img src={seacrhIcon} alt="Search Icon" />
                    </button>
                    <button>Post a Job</button>
                </div>
            </div>
            <div className={`mobile-search ${showSearch ? "show-bar" : ""}`}>
                <input type="text" placeholder='Search by company, title, or location' />
                <button>Search</button>
            </div>
        </>
    )
}

export default Header
