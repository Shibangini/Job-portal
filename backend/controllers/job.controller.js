import {Job} from '../models/job.model.js';

//For Admin
export const postJob = async (req, res) => {
    try {
        console.log("REQ BODY --->", req.body);

        console.log("title:", req.body.title);
        console.log("description:", req.body.description);
        console.log("requirements:", req.body.requirements);
        console.log("salary:", req.body.salary);
        console.log("experience:", req.body.experience);
        console.log("location:", req.body.location);
        console.log("jobType:", req.body.jobType);
        console.log("position:", req.body.position);
        console.log("companyId:", req.body.companyId);
        console.log("userId:", req.body.userId);

        const { title, description, requirements, salary , companyId, location, jobType, experience, position} = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !companyId || !location || !jobType || !experience || !position) {
            return res.status(400).json({ 
                message: 'Please fill in all fields',
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(','),
            salary:Number(salary),
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: 'Job posted successfully',
            success: true,
            job
        });
    } catch (error) {
        console.log(error);
    }
};

//For Student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
    };
        const jobs = await Job.find(query).populate({
            path:"company",
        }).sort({createdAt: -1});
        if (!jobs) {
            return res.status(404).json({
                message: 'No jobs found',
                success: false
            })
        };
        return res.status(200).json({
            message: 'Jobs fetched successfully',
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error);
    }
}

//For Student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            })
        };
        return res.status(200).json({
            message: 'Job fetched successfully',
            success: true,
            job
        })
    } catch (error) {
        console.log(error);
    }
}

//For admin (no of jobs posted by a company)
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(404).json({
                message: 'No jobs found',
                success: false
            })
        };
        return res.status(200).json({
            message: 'Jobs fetched successfully',
            success: true,
            jobs
        });
    } catch (error) {
        console.log(error);
    }
}; 