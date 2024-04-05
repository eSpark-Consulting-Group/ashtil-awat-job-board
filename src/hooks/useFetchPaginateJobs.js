import { useEffect, useState } from 'react';
import supabase from './useFetchPaginateJobs';

function useFetchPaginateJobs(searchTerm, selectedCompany, selectedRole, selectedLocation) {
    const [smoothies, setSmoothies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const matchfilter = {};

            if (selectedCompany) {
                matchfilter.comp_name = selectedCompany;
            }

            if (selectedRole) {
                matchfilter.job_title = selectedRole;
            }

            if (selectedLocation) {
                matchfilter.primary_location = selectedLocation;
            }

            if (searchTerm && page !== 1) {
                setPage(1);
            }

            const offset = (page - 1) * pageSize;
            let query = supabase.from('Jobs').select("*", { count: "exact" }).range(offset, offset + pageSize - 1).match(matchfilter);
            if (searchTerm) {
                query = query.or(`comp_name.ilike.%${searchTerm}%, comp_website.ilike.%${searchTerm}%, primary_location.ilike.%${searchTerm}%`);
            }

            const { data, error, count } = await query;

            if (error) {
                setFetchError('Could not fetch the smoothies');
                setSmoothies([]);
                setLoading(false)
            } else {
                setSmoothies(data);
                setTotalPages(Math.ceil(count / pageSize));
                setFetchError(null);
                setLoading(false)
            }
        } catch (error) {
            console.error('Error fetching smoothies:', error.message);
            setFetchError('Could not fetch the smoothies');
            setSmoothies([]);
            setLoading(false)
        }
    };


    useEffect(() => {
        fetchJobs();
    }, [page, pageSize]);

    const refech = () => {
        fetchJobs()
    }


    const handlePageChange = (newPage) => {
        setPage(newPage)
    }


    return { refech, smoothies, totalPages, fetchError, page, pageSize, handlePageChange, loading };
}

export default useFetchPaginateJobs;
