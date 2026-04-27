import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import path from 'path';

export const register = async (req, res) => {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    console.log('LOGIN BODY:', req.body);
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        };

        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200)
            // use sameSite:lax for local dev so the browser will include the cookie in cross-origin requests
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        if (!req.body) {
            console.log('updateProfile called but req.body is undefined. Headers:', req.headers);
            return res.status(400).json({ message: 'Request body missing or not parsed. Ensure multipart/form-data parser (multer) is used.', success: false });
        }

    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    console.log('updateProfile req.id:', req.id);
    console.log('updateProfile body:', req.body);
    console.log('updateProfile file:', req.file);
        //cloudinary upload code
        let cloudResponse = null;
        if (file) {
            try {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: 'raw'
                });
                console.log('cloudResponse:', cloudResponse);
            } catch (err) {
                console.error('Cloudinary upload failed:', err);
                return res.status(500).json({ message: 'File upload failed', success: false });
            }
        }

        let skillsArray;
        if (skills){
            skillsArray = skills.split(",");
        }

        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        //updating data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // attach resume info if uploaded
        if (cloudResponse){
            user.profile.resume = cloudResponse.secure_url;  //save the exact cloudinary url
            user.profile.resumePublicId = cloudResponse.public_id || null;
            user.profile.resumeFormat = cloudResponse.format || null;
            user.profile.resumeResourceType = cloudResponse.resource_type || null;
            user.profile.resumeOriginalName = file.originalname; //save original file name for reference
        }

        await user.save();

        console.log('User saved:', user);

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "User Profile updated successfully",
            success: true,
            user: userData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const serveResume = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user || !user.profile) {
            return res.status(404).json({ message: 'Resume not found', success: false });
        }

        const resumeUrl = user.profile.resume;
        const originalName = user.profile.resumeOriginalName || 'resume.pdf';

        if (!resumeUrl) {
            return res.status(404).json({ message: 'Resume not found', success: false });
        }

        console.log('Fetching resume from:', resumeUrl);
        
        // Fetch the file from Cloudinary
        const remoteRes = await fetch(resumeUrl);
        if (!remoteRes.ok) {
            console.error('Failed to fetch resume:', remoteRes.status);
            return res.status(502).json({ message: 'Failed to fetch resume', success: false });
        }

        // Set headers so browser opens inline instead of downloading
        const contentType = remoteRes.headers.get('content-type');
        console.log('Cloudinary Content-Type:', contentType);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
        const contentLength = remoteRes.headers.get('content-length');
        if (contentLength) {
            res.setHeader('Content-Length', contentLength);
        }

        console.log('Response headers set. Sending file...');
        // Convert web stream to buffer and send
        const buffer = await remoteRes.arrayBuffer();
        console.log('Buffer size:', buffer.byteLength);
        res.end(Buffer.from(buffer));
    } catch (error) {
        console.error('serveResume error:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};