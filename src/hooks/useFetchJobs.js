import { useEffect, useState } from 'react';
import supabase  from '../hooks/useFetchJobs';

function useFetchJobs() {
    const [companyList, setCompanyList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase.from('Jobs').select('comp_name, job_title, primary_location');


                if (error) {
                    setError('Error fetching companies, roles, and locations');
                } else {
                    const companies = data.map(company => company.comp_name);
                    setCompanyList(companies);

                    const roles = data.map(role => role.job_title);
                    setRoleList(roles);

                    const locations = data.map(location => location.primary_location);
                    setLocationList(locations);
                }
            } catch (error) {
                setError('Error fetching companies, roles, and locations');
            } finally {
                setLoading(false); 
            }
        };

        fetchAllJobs();
    }, []);

    return { companyList, roleList, locationList, loading, error };
}

export default useFetchJobs;
