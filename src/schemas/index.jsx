import * as Yup from "yup"

export const jobInfoSchema = Yup.object({
    comp_name: Yup.string().required("Company name is required"),
    comp_website: Yup.string()
        .url("Company website must be a valid URL")
        .required("Company website is required"),
    job_title: Yup.string().required("Job title is required"),
    primary_location: Yup.string().required("Primary location is required"),
    job_description: Yup.string().required("Job Description is required"),
    tags: Yup.array()
        .required("Tags must have at least one item")
        .test('tags', 'Tags must have at least one item', value => value && value.length > 0),
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email().required("Email is required"),
});

