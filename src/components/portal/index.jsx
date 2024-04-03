import React, { useState } from 'react'
import Header from '../header'
import Dropdown from '../../common/Dropdown/Dropdown'
import { companyOptions, jobsContent, locationOptions, roleOptions } from '../../constant'
import seacrhIcon from "../../assets/magnifying-glass.png"
import { apple, flames, google } from '../../assets'

const Portal = () => {
  const [activeItem, setActiveItem] = useState(jobsContent[0])
  
  const handleJobClick = (index) => {
    setActiveItem(jobsContent[index])
  }
  return (
    <div>
      <Header />
      <div className="dropdowns-container">
        <Dropdown placeholder={"Location"} options={locationOptions} />
        <Dropdown placeholder={"Role"} options={roleOptions} />
        <Dropdown placeholder={"Company"} options={companyOptions} />
      </div>

      <div className="portal-main">
        <div className="cards-conatiner">
          {jobsContent.map((item, index) => (

            <div className={`card ${index === jobsContent.indexOf(activeItem) ? 'active' : ''}`} key={index} onClick={() => handleJobClick(index)}>
              <div className='img'>
                <img src={item?.logo === "Google" ? google : apple} alt="Company Icon" />
              </div>
              <div className="title">
                <h2>{item?.role}</h2>
                <h3>{item?.company}</h3>
              </div>
              <div className="tags">
                {item?.tags.map((item, index) => (
                  <div key={index}>{item}</div>
                )
                )}
              </div>
              <button>{item?.btnText}</button>
            </div>
          )
          )}
        </div>
        <div className="info-container">
          <div className="job-info">
            <div className="info-head">
              <div className='job-logo'>
                <img src={activeItem?.logo === "Google" ? google : apple} alt="" />
              </div>
              <div className="job-description">
                <h2>{activeItem?.role}</h2>
                <h3>{activeItem?.company}</h3>
              </div>
            </div>
            <div className="job-requirements">
              <h2>Minimum Requirements</h2>
              <h3>{activeItem?.requirements}</h3>
            </div>
            <div className="job-responsibilites">
              <h2>Key Responsibilites</h2>
              <h3>{activeItem?.responsibilities}</h3>
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
    </div>
  )
}

export default Portal
