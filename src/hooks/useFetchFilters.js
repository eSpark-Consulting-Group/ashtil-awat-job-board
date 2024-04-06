import { useEffect, useState } from 'react';
import supabase  from '../services/supabaseClient';

function useFetchFilters() {
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
                    const roles = data.map(role => role.job_title);
                    const locations = data.map(location => location.primary_location);

                    const companyObjects = companies.map(company => ({ value: company, label: company }));
                    const roleObjects = roles.map(role => ({ value: role, label: role }));
                    const locationObjects = locations.map(location => ({ value: location, label: location }));
               
                    setCompanyList(companyObjects);

                    setRoleList(roleObjects);

                    setLocationList(locationObjects);
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

export default useFetchFilters;
