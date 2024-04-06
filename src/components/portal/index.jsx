import React, { useEffect, useState } from 'react'
import Header from '../header'
import Dropdown from '../../common/Dropdown/Dropdown'
import { flames } from '../../assets'
import useFetchJobs from '../../hooks/useFetchJobs'
import { Link } from 'react-router-dom'
import { StateCall } from '../../store/contextApi'
import useFetchFilters from '../../hooks/useFetchFilters'

const Portal = () => {
  const { state, setState } = StateCall()
  const { companyList, roleList, locationList } = useFetchFilters();

  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState()
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedlocation, setSelectedLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { jobs, loading, error, itemsPerPage } = useFetchJobs()

  const handleJobClick = (index) => {
    setActiveItem(jobs[index])
  }


  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };


  const getCurrentPageJobs = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredJobs.length / itemsPerPage);
  };

  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
    const filtered = jobs.filter(job =>
      job?.comp_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.primary_location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
    console.log({ filtered });
    setPage(1); // Reset page to 1 when search is performed
  };

  const handleClearFilters = () => {
    setSelectedCompany("")
    setSelectedRole("")
    setSelectedLocation("")
  }

  useEffect(() => {
    let filtered = jobs;

    if (selectedlocation) {
      const { value } = selectedlocation || ""
      filtered = filtered.filter(job => job.primary_location?.toLowerCase()?.includes(value?.toLowerCase()));
    }

    if (selectedCompany) {
      const { value } = selectedCompany || ""
      filtered = filtered.filter(job => job.comp_name?.toLowerCase()?.includes(value?.toLowerCase()));
    }

    if (selectedRole) {
      const { value } = selectedRole || ""
      filtered = filtered.filter(job => job.job_title?.toLowerCase()?.includes(value?.toLowerCase()));
    }

    setFilteredJobs(filtered);
    setPage(1); // Reset page to 1 when filtering is performed
  }, [jobs, selectedRole, selectedCompany, selectedlocation]);

  useEffect(() => {
    if (jobs?.length > 0) {
      setFilteredJobs(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    if (jobs?.length > 0)
      setActiveItem(jobs[0])
  }, [jobs])




  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="dropdowns-container">
        <Dropdown placeholder={"Location"} value={selectedlocation} options={locationList} onChange={(e) => setSelectedLocation(e)} />
        <Dropdown placeholder={"Role"} value={selectedRole} options={roleList} onChange={(e) => setSelectedRole(e)} />
        <Dropdown placeholder={"Company"} value={selectedCompany} options={companyList} onChange={(e) => setSelectedCompany(e)} />
        <button
          onClick={handleClearFilters}
          className='general-btn-cancel'
        >{"Clear"}
        </button>
      </div>


      {
        !loading ?
          <>
            {
              filteredJobs?.length > 0 ?
                <div className="portal-main">
                  <div className="cards-conatiner">
                    <div>
                      {getCurrentPageJobs()?.map((item, index) => {
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
                      )}
                    </div>

                    <div className="pagination-container">
                      <div>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
                        &nbsp;
                        <span>{page} / {getTotalPages()}</span>
                        &nbsp;
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === getTotalPages()}>Next</button>
                      </div>
                    </div>
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
                :
                <div className='portal-no-jobs-screen'>
                  <h3>No Jobs Found</h3>
                </div>
            }
          </>
          : <div className='portal-no-jobs-screen'>
            <h3>Loading...</h3>
          </div>
      }




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
