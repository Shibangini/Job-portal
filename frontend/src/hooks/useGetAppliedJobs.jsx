import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllAppliedJobs } from '@/redux/jobSlice';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    // backend returns 'applications' array
                    dispatch(setAllAppliedJobs(res.data.applications || []));
                }
            } catch (error) {
                console.log('fetchAppliedJobs error', error);
            }
        }
        fetchAppliedJobs();
    }, [dispatch])
};
export default useGetAppliedJobs;