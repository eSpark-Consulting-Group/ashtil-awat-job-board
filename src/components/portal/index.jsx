import React, { useEffect, useState } from 'react'
import Header from '../header'
import Dropdown from '../../common/Dropdown/Dropdown'
import { companyOptions, jobsContent, locationOptions, roleOptions } from '../../constant'
import { apple, flames, google } from '../../assets'
import useFetchPaginateJobs from '../../hooks/useFetchPaginateJobs'
import useFetchJobs from '../../hooks/useFetchJobs'
import { Link } from 'react-router-dom'
import { StateCall } from '../../store/contextApi'

const Portal = () => {
  const { state, setState } = StateCall()
  const { jobs, searchTerm  } = state
  const [activeItem, setActiveItem] = useState()
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedlocation, setSelectedLocation] = useState('');
  const { companyList, roleList, locationList } = useFetchJobs();
  const { fetchError, totalPages, page, handlePageChange, refech } = useFetchPaginateJobs(selectedCompany, selectedRole, selectedlocation, true);
  
  
  const handleJobClick = (index) => {
    setActiveItem(jobs[index])
  }

  useEffect(() => {
    if (jobs?.length > 0)
    setActiveItem(jobs[0])
  }, [jobs])




  return (
    <div>
      <Header />
      <div className="dropdowns-container">
        <Dropdown placeholder={"Location"} options={locationOptions} onChange={()=>{}} />
        <Dropdown placeholder={"Role"} options={roleOptions} onChange={()=>{}} />
        <Dropdown placeholder={"Company"} options={companyOptions} onChange={()=>{}} />
      </div>

      <div className="portal-main">
        <div className="cards-conatiner">
          {jobs?.map((item, index) => {
            const { comp_logo, job_title, comp_name, tags, comp_website } = item || {}
            return (
              <div className={`card ${index === jobs.indexOf(activeItem) ? 'active' : ''}`} key={index} onClick={() => handleJobClick(index)}>
                <div className='img'>
                  <img src={comp_logo} alt="Company Icon" />
                </div>
                <div className="title">
                  <h2>{job_title}</h2>
                  <h3>{comp_name}</h3>
                </div>
                <div className="tags">
                  {tags?.map((item, index) => (
                    <div key={index}>{item}</div>
                  )
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
          )}
        </div>
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
                <h2>{activeItem?.role}</h2>
                <h3>{activeItem?.company}</h3>
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
            <div className='apply-button'>
              <button>Apply</button>
            </div>
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
      </div>
      <div className="promotion">
        <h3>Signup for a curated list of jobs sent to your inbox every week</h3>
        <div>
          <input type="text" placeholder='john@maildrop.cc' />
          <button>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Portal
