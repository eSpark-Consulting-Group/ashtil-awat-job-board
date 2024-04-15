import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import { companyInputs, jobInputs, personalInfo } from '../constant'
import supabase, { supabaseBucketBaseUrl } from "../services/supabaseClient"
import { TagsInput } from 'react-tag-input-component'
import { useFormik } from 'formik';
import { jobInfoSchema } from '../schemas';
import { toast } from 'react-toastify';
import { Header, Dropdown, Input, ImgUploader } from '../components';
import Loader from "react-js-loader";
import Modal from '../components/Modal/Modal';
import { StateCall } from '../store/contextApi';


const PostJob = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { state, setState } = StateCall()
  const [clientSecret, setClientSecret] = useState("");
  const { jobData } = state
  const [windowLoading, setWindowLoading] = useState(false)



  const handleDropdownChange = (item) => {
    setState({
      ...state,
      jobData: {
        ...jobData,
        is_remote: item.value
      }
    });
  };


  async function handleImgChange(e) {
    let file = e


    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(uuidv4(), file)

    if (data) {
      setState({
        ...state,
        jobData: {
          ...jobData,
          comp_logo: supabaseBucketBaseUrl + data?.Key
        }
      });
    } else {
      console.log(error);
    }
  }

  const fetchPaymentIntentStrip = async () => {
    setLoading(true)
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: JSON.stringify({ amount: 9900 }),
      mode: 'no-cors',
    })

    if (error) {
      toast.error("Something went wrong. Please try again")
      setLoading(false)
    }
    if (data) {
      setClientSecret(data?.clientSecret?.client_secret);
      setIsOpen(true)
      setLoading(false)
      localStorage.setItem("job-data", JSON.stringify(jobData))
    }

  }


  const uploadJobSupabase = async (jobData) => {
    const { data, error } = await supabase
      .from('Jobs')
      .insert(jobData)

    if (error) {
      console.log(error?.message)
      setWindowLoading(false)
      toast.error("Something went wrong. Please try again")
    }

    if (data) {
      setWindowLoading(false)
      localStorage.removeItem("job-data")
      toast.success("Job posted successfully")
      navigate("/")
    }
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntent = urlParams.get('payment_intent');
    const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');
    const redirectStatus = urlParams.get('redirect_status');
    const job = localStorage.getItem("job-data")

    if (paymentIntent && paymentIntentClientSecret && redirectStatus === "succeeded" && job) {
      setWindowLoading(true)
      uploadJobSupabase(JSON.parse(job))
    }
  }, []);


  const CloseHandler = () => {
    setIsOpen(false)
    clientSecret("")
  }


  const { values, handleSubmit, handleChange, errors, touched, isValid, submitCount, } = useFormik({
    initialValues: {
      tags: [],
      comp_name: "",
      comp_website: "",
      job_title: "",
      primary_location: "",
      job_description: "",
      full_name: "",
      email: ""
    },

    validationSchema: jobInfoSchema,
    onSubmit: async (values) => {

      if (!jobData.comp_logo || jobData.comp_logo === "") {
        toast.error("Company logo is required");
        console.log("object")

      } else {
        fetchPaymentIntentStrip()
      }

    }


  });

  const customHandleChange = (e, name) => {
    handleChange(e);
    setState({
      ...state,
      jobData: {
        ...jobData,
        [name]: e.target.value
      }
    });
  };

  useEffect(() => {
    if (submitCount > 0 && !isValid) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
    }
    // else if ((submitCount > 0 && !jobData.comp_logo) || (submitCount > 0 && jobData.comp_logo === "")) {
    //   toast.error("Company logo is required");
    // }
  }, [isValid, submitCount])


  return (
    <>
      <Header />
      {windowLoading ? <div style={{ width: "100vw", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="spinner-default" bgColor={"red"} color={"#00ff37"} size={70} />
      </div> : <div className="job-post-container">
        <div className="job-post-box">
          <div className="tagline-parent">
            <div className="tagline">
              <h2>Hire the best.</h2>
              <h3>Share your job post with thousands of job seekers</h3>
            </div>
          </div>
          <form className="job-inputs-boxes" onSubmit={handleSubmit}>
            <div className="comapny-info">
              <h3>Company Details</h3>
              <div className="company-inputs-parent">
                {companyInputs.map((item, index) => (
                  <div className="company-inputs" key={index}>
                    <Input value={values[item?.name]} onChange={(e) => customHandleChange(e, item?.name)} label={item?.label} placeholder={item?.placeholder} name={item?.name} type={item?.type} />

                  </div>
                ))}
                <div className="company-inputs">
                  <div style={{ display: 'flex', rowGap: "12px", flexDirection: "column" }}>
                    <p style={{ fontSize: "14px" }}>Company logo</p>
                    <ImgUploader onFileChange={handleImgChange} />
                  </div>
                  {jobData?.comp_logo && <div className={`preview-img`}>
                    <img
                      style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "5px" }}
                      src={jobData?.comp_logo} alt="company logo" />
                  </div>}
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
                      <Input value={values[item?.name]} onChange={(e) => customHandleChange(e, item?.name)} label={item?.label} placeholder={item?.placeholder} name={item?.name} type={item?.type} />

                      :
                      <>
                        <p style={{ fontSize: "14px" }}>is Remote?</p>
                        <Dropdown
                          name={item?.name} // Pass the name attribute
                          options={item?.options}
                          post={true}
                          onChange={handleDropdownChange}
                        />
                      </>
                    }
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                <label htmlFor="job_description" style={{ fontSize: "14px" }}>
                  Job Description
                </label>
                <textarea value={values.job_description} onChange={(e) => customHandleChange(e, "job_description")} name="job_description" id="job_description" cols="30" rows="6"></textarea>
              </div>
              <TagsInput
                value={values.tags}
                onChange={(tags) => {
                  customHandleChange({
                    target: {
                      name: "tags",
                      value: tags,
                    },

                  },
                    "tags"
                  );
                }}
                name="tags"
                placeHolder="Tags(Start with #)"
                classNames="tags-input"
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
                    <Input value={values[item?.name]} onChange={(e) => customHandleChange(e, item?.name)} label={item?.label} placeholder={item?.placeholder} name={item?.name} type={item?.type} />

                  </div>
                ))}
              </div>
            </div>
            <div className="job-apply-button">
              <button type='submit'>{loading ? <Loader type="spinner-default" bgColor={"#ffffff"} color={"#00ff37"} size={30} /> : "Apply for $99"}</button>
            </div>
          </form>
          <Modal clientSecret={clientSecret} visible={isOpen} onClose={CloseHandler} />
        </div>
      </div>}

    </>
  )
}

export default PostJob
