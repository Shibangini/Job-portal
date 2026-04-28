import axios from "axios";
import { useEffect } from "react";
import {setAllJobs} from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
                if (res.data.success) {
                    console.log('Fetched jobs count:', Array.isArray(res.data.jobs) ? res.data.jobs.length : 0);
                    console.log('Fetched job ids:', res.data.jobs?.map(j => j._id));
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }  
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs;
