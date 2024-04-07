import React from 'react'
import { Link } from 'react-router-dom'

const JobCard = ({item, index, jobs, activeItem, setActiveItem}) => {
    const { comp_logo, job_title, comp_name, tags, comp_website } = item || {}
    return (
        <div key={index} className={`card ${item === activeItem ? 'active' : ''}`} onClick={() => setActiveItem(item)}>
            <div className='img'>
                <img src={comp_logo} alt="Company Icon" />
            </div>
            <div className="title">
                <h2>{job_title}</h2>
                <h3>{comp_name}</h3>
            </div>
            <div className="tags">
                {tags?.map((item, index) => {
                    return (
                        <div key={index}>{item?.substring(1)}</div>
                    )
                }

                )}
            </div>
            <Link target='_blank' to={comp_website}>
                <button
                >{"Apply"}
                </button>
            </Link>
        </div>
    )
}

export default JobCard