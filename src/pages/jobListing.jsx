import React, { useEffect, useState } from 'react'
import { Dropdown, Header, JobCard, JobInfo } from '../components'
import { useFetchFilters, useFetchJobs } from '../hooks'
import { getCurrentPageJobs, getTotalPages } from '../utils'
import Loader from "react-js-loader";



const JobListing = () => {
  const { companyList, roleList, locationList } = useFetchFilters();
  const { jobs, loading, error, itemsPerPage } = useFetchJobs()
  const [page, setPage] = useState(1);
  const [activeItem, setActiveItem] = useState()
  const [filters, setFilters] = useState({ selectedCompany: '', selectedRole: '', selectedlocation: '' });
  const [filteredJobs, setFilteredJobs] = useState([]);


  const handleSearch = (searchTerm) => {
    const filtered = jobs.filter(job =>
      job?.comp_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.primary_location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ selectedCompany: '', selectedRole: '', selectedlocation: '' });
  }

  useEffect(() => {
    let filtered = jobs;
    const { selectedCompany, selectedRole, selectedlocation } = filters;

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
    setPage(1);
  }, [jobs, filters]);

  useEffect(() => {
    if (jobs?.length > 0) {
      setFilteredJobs(jobs);
      setActiveItem(jobs[0])
    }
  }, [jobs]);



  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!loading && filteredJobs?.length <= 0) {
    return (
      <div className='portal-no-jobs-screen'>
        <h3>No Jobs Found</h3>
      </div>
    )
  }

  console.log(activeItem)



  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="dropdowns-container">
        <Dropdown placeholder={"Location"} value={filters.selectedlocation} options={locationList}
          onChange={(e) =>
            setFilters({ ...filters, selectedlocation: e })} />
        <Dropdown placeholder={"Role"} value={filters.selectedRole} options={roleList}
          onChange={(e) =>
            setFilters({ ...filters, selectedRole: e })
          } />
        <Dropdown placeholder={"Company"} value={filters.selectedCompany} options={companyList}
          onChange={(e) =>
            setFilters({ ...filters, selectedCompany: e })
          } />
        <button
          onClick={handleClearFilters}
          className='general-btn-cancel'
        >{"Clear"}
        </button>
      </div>


      {
        !loading ?
          <>
            <div className="portal-main">
              <div className="cards-conatiner">
                <div>
                  {getCurrentPageJobs(page, itemsPerPage, filteredJobs)?.map((item, index) => (
                    <JobCard item={item} index={index} jobs={jobs} activeItem={activeItem} setActiveItem={setActiveItem} />
                  )
                  )}
                </div>

                <div className="pagination-container">
                  <div>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                    &nbsp;
                    <span>{page} / {getTotalPages(itemsPerPage, filteredJobs)}</span>
                    &nbsp;
                    <button onClick={() => setPage(page + 1)} disabled={page === getTotalPages(itemsPerPage, filteredJobs)}>Next</button>
                  </div>
                </div>
              </div>


              <JobInfo activeItem={activeItem} />
            </div>
          </>
          : <div className='portal-no-jobs-screen'>
            <Loader type="spinner-default" bgColor={"#48494a"} color={"#00ff37"} size={40} />
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

export default JobListing
