import axios from "axios";
import { useEffect } from "react";
import {setAllAdminJobs} from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                console.log('Fetching admin jobs from:', `${JOB_API_END_POINT}/getadminjobs`);
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                console.log('Admin jobs response:', res);
                if (res.data.success) {
                    console.log('Setting admin jobs:', res.data.jobs);
                    dispatch(setAllAdminJobs(res.data.jobs));
                } else {
                    console.log('API returned success: false', res.data);
                }
            } catch (error) {
                console.log('Error fetching admin jobs:', error);
            }  
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs;
