// PostJob.js
import React, { useState } from 'react'
import Header from '../header'
import Input from '../../common/Inputs/Input'
import { companyInputs, jobInputs, personalInfo } from '../../constant'
import ImgUploader from '../../common/ImgUpload/ImgUploader'
import Dropdown from '../../common/Dropdown/Dropdown'
import { TagsInput } from 'react-tag-input-component'


const PostJob = () => {
  const [jobData, setJobData] = useState({
    tags: [],
    comp_name: "",
    comp_website: "",
    job_title: "",
    comp_logo: "",
    is_remote: "",
    primary_location: "",
    job_description: "",
    full_name: "",
    email: ""
  })

  const [showImg, setShowImg] = useState(false)

  const handleInputChange = (name, value) => {
    setJobData({
      ...jobData,
      [name]: value
    });
  };

  const handleDropdownChange = (name, value) => {
    setJobData({
      ...jobData,
      [name]: value
    });
  };

  const handleImgChange = (file) => {
    setJobData({
      ...jobData,
      comp_logo: file,
    });
  };

  const SubmitHandler = () => {
    console.log(jobData)
  }

  return (
    <>
      <Header />
      <div className="job-post-container">
        <div className="job-post-box">
          <div className="tagline-parent">
            <div className="tagline">
              <h2>Hire the best.</h2>
              <h3>Share your job post with thousands of job seekers</h3>
            </div>
          </div>
          <div className="job-inputs-boxes">
            <div className="comapny-info">
              <h3>Company Details</h3>
              <div className="company-inputs-parent">
                {companyInputs.map((item, index) => (
                  <div className="company-inputs" key={index}>
                    <Input onChange={handleInputChange} label={item?.label} placeholder={item?.placeholder} name={item?.name} type={item?.type} />
                  </div>
                ))}
                <div className="company-inputs">
                  <div style={{ display: 'flex', rowGap: "12px", flexDirection: "column" }}>
                    <p style={{fontSize:"14px"}}>Company logo</p>
                    <ImgUploader onFileChange={handleImgChange} />
                  </div>
                  <div className={`preview-img ${showImg ? "show-preview" : 'hide-preview'}`}></div>
                </div>
              </div>
            </div>
            <div className="job-details">
              <h3>Job Details</h3>
              <div className="job-inputs-parent">
                {jobInputs.map((item, index) => (
                  <div className="job-inputs">
                    {item?.type === "text"
                      ?
                      <Input onChange={handleInputChange} label={item?.label} placeholder={item?.placeholder} name={item?.name} type={item?.type} />
                      :
                      <>
                        <p style={{fontSize:"14px"}}>Company logo</p>
                        <Dropdown
                          name={item?.name} // Pass the name attribute
                          options={item?.options}
                          placeholder={item?.placeholder}
                          onChange={handleDropdownChange}
                        />
                      </>
                    }
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column"}}>
                <label htmlFor="job_description" style={{fontSize:"14px"}}>
                  Job Description
                </label>
                <textarea onChange={(e) => handleInputChange("job_description", e.target.value)} name="job_description" id="job_description" cols="30" rows="6"></textarea>
              </div>
              <TagsInput
                value={jobData?.tags}
                onChange={(e) => handleInputChange("tags", e)}
                name="tags"
                placeHolder="Tags(Start with #)"
                classNames={"tags-input"}
                beforeAddValidate={(tag) => {
                  if (tag.trim().startsWith("#")) {
                    return true;
                  } else {
                    return false;
                  }
                }}
              />
            </div>
            <div className="personal-contact">
              <div className="company-inputs-parent">
                <div className="personal-inputs-text">
                  <h2>Primary Contact</h2>
                  <h3>This is just for DevContra team</h3>
                </div>
                {personalInfo.map((item, index) => (
                  <div className="personal-inputs" key={index}>
                    <Input onChange={handleInputChange} label={item?.label} placeholder={item?.placeholder} name={item?.name} type={item?.type} />
                  </div>
                ))}
              </div>
            </div>
            <div className="job-apply-button">
              <button onClick={SubmitHandler}>Apply for $99</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default PostJob
