import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        let company = await Company.findOne({name: companyName});
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error registering company",
            success: false,
            error: error.message
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in user id
        const company = await Company.find({userId});
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company found",
            success: true,
            company
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching companies",
            success: false,
            error: error.message
        });
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company found",
            success: true,
            company
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching company",
            success: false,
            error: error.message
        });
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;

        const updatedData = {name, description, website, location};
        
        // Upload to cloudinary and add logo URL if file provided
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updatedData.logo = cloudResponse.secure_url;
        }
        
        // Use runValidators and context to bypass unique constraint issues during update
        const company = await Company.findByIdAndUpdate(
            req.params.id, 
            updatedData, 
            {
                new: true,
                runValidators: false  // Disable validators to avoid unique constraint issues
            }
        );
        
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company updated",
            success: true,
            company
        });
    } catch (error) {
        console.log("Update Company Error:", error);
        return res.status(500).json({
            message: "Error updating company",
            success: false,
            error: error.message
        });
    }
}