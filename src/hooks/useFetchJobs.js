import { useEffect, useState } from 'react';
import supabase from '../services/supabaseClient';
import { StateCall } from '../store/contextApi';

function useFetchJobs() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([])
    const [itemsPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase.from('Jobs')


                if (error) {
                    setError('Error fetching companies, roles, and locations');
                } else {
                    setJobs(data)

                }
            } catch (error) {
                setError('Error fetching companies, roles, and locations');
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, []);

    return { jobs, totalPages, itemsPerPage, loading, error, };
}

export default useFetchJobs;
