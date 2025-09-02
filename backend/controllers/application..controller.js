import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: 'Job ID is required',
                success: false
            });
        }
        //check if user has already applied for the job
        const existingApplication = await Application.findOne({ applicant: userId, job: jobId });
        if (existingApplication) {
            return res.status(400).json({
                message: 'You have already applied for this job',
                success: false
            });
        }

        //check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: 'Job does not exist',
                success: false
            });
        }
    }

    //create a new application
    const newApplication = await Application.create({
        applicant: userId,
        job: jobId
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
        message: 'Job applied successfully',
        success: true,
        newApplication
    })
    catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        if(!applications) {
                return res.status(404).json({
                    message: 'No applications found',
                    success: false
                });
            }

        return res.status(200).json({
                message: 'Applications fetched successfully',
                success: true,
                applications
            });
        } catch (error) {
            console.log(error);
        }
    };

    //admin can see how many students have applied for a particular job
    export const getApplicants = async (req, res) => {
        try {
            const jobId = req.params.jobId;
            const applicants = await Application.find({ job: jobId }).populate({
                path: 'applications',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'applicant'
                }
            });
            if (!job) {
                return res.status(404).json({
                    message: 'No job found',
                    success: false
                });
            }
            return res.status(200).json({
                message: 'Applicants fetched successfully',
                success: true,
                applicants
            });
        } catch (error) {
            console.log(error);
        }
    }
    export const updateStatus = async (req, res) => {
        try {
            const { status } = req.body;
            const applicationId = req.params.id;
            if (!status) {
                return res.status(404).json({
                    message: 'Status not found',
                    success: false
                });
            }
            const application = await Application.findById(applicationId);
            if (!application) {
                return res.status(404).json({
                    message: 'Application not found',
                    success: false
                });
            };
            //update status
            application.status = status.toLowerCase();
            await application.save();
            return res.status(200).json({
                message: 'Status updated successfully',
                success: true
            });
        } catch (error) {
            console.log(error);
        }
    }