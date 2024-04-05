import React, { useEffect, useState } from 'react'
import { seacrhIcon } from '../../assets'
import { Link } from 'react-router-dom'
import { StateCall } from '../../store/contextApi'
import useFetchPaginateJobs from '../../hooks/useFetchPaginateJobs'

const Header = () => {
    const { state, setState } = StateCall()
    const [showSearch, setShowSearch] = useState(false)
    const { refech } = useFetchPaginateJobs();

    const handleSearch = () => {
        refech()
    }

    return (
        <>
            <div className='header'>
                <div className='header-left'>
                    <h1>DevContra</h1>
                    <div className='search-bar'>
                        <input
                            value={state.searchTerm}
                            onChange={(e) => setState({ ...state, searchTerm: e.target.value })}
                            type="text" placeholder='Search by company, title, or location' />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className='header-right'>
                    <button onClick={() => { setShowSearch(!showSearch) }}>
                        <img src={seacrhIcon} alt="Search Icon" />
                    </button>
                    <button>
                        <Link to={"/post-a-job"}>
                            Post a Job
                        </Link>
                    </button>
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
