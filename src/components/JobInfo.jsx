import React from 'react'
import { flames } from '../assets'
import { Link } from 'react-router-dom'

const JobInfo = ({ activeItem }) => {
  return (
    <div className="info-container">
      <div className="job-info">
        <div className="info-head">
          <div className='job-logo'>
            <img
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%'
              }}
              src={activeItem?.comp_logo} alt="" />
          </div>
          <div className="job-description">
            <h2>{activeItem?.job_title}</h2>
            <h3>{activeItem?.comp_name}</h3>
          </div>
        </div>
        <div className="job-requirements">
          <h2>Minimum Requirements</h2>
          <h3>
            Minimum qualifications are the minimum amounts of education or experience and the minimum level of knowledge, skills, abilities, licensures, certifications and other job-related requirements that must be met for a candidate to be considered for a position.
          </h3>
        </div>
        <div className="job-responsibilites">
          <h2>Key Responsibilites</h2>
          <h3>{activeItem?.job_description}</h3>
        </div>
        <Link target='_blank' className='apply-button' to={activeItem?.comp_website}>
          <button
          >{"Apply"}
          </button>
        </Link>
      </div>
      <div className="job-popularity">
        <div className='trending'>
          <img src={flames} alt="" />
        </div>
        <div className='job-popularity-description'>
          <h2>This job is popular</h2>
          <h3>91 applied this week</h3>
        </div>
      </div>
    </div>
  )
}

export default JobInfo