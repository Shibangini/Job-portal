import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '../redux/authSlice'

const USER_API_END_POINT = "http://localhost:8000/api/v1/user";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills
            ? (Array.isArray(user.profile.skills) ? user.profile.skills.join(",") : String(user.profile.skills))
            : "",
        file: null
    });

    useEffect(() => {
        if (open) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: user?.profile?.skills
                    ? (Array.isArray(user.profile.skills) ? user.profile.skills.join(",") : String(user.profile.skills))
                    : "",
                file: null
            });
        }
    }, [open, user]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("fullname", input.fullname || "");
            formData.append("email", input.email || "");
            formData.append("phoneNumber", input.phoneNumber || "");
            formData.append("bio", input.bio || "");

            const skillsValue = Array.isArray(input.skills) ? input.skills.join(",") : (input.skills || "");
            formData.append("skills", skillsValue);

            if (input.file) {
                formData.append("file", input.file);
            }

            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
                timeout: 30000
            });

            if (res.data?.success) {
                if (res.data.user) {
                    dispatch(setUser(res.data.user));
                }
                toast.success(res.data.message || 'Profile updated');
                setOpen(false);
            } else {
                toast.error(res.data?.message || 'Update failed');
            }
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || 'Something went wrong';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent aria-describedby="update-dialog-desc" className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription id="update-dialog-desc">Update your profile details and upload a resume (PDF).</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right'>Full Name</Label>
                                <Input
                                    id="name"
                                    name='fullname'
                                    type='text'
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input
                                    id="email"
                                    name='email'
                                    type='email'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='number' className='text-right'>Phone Number</Label>
                                <Input
                                    id="number"
                                    name='phoneNumber'
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Input
                                    id="bio"
                                    name='bio'
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Input
                                    id="skills"
                                    name='skills'
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className='col-span-3'
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file' className='text-right'>Resume</Label>
                                <Input
                                    id="file"
                                    name='file'
                                    type='file'
                                    accept="application/pdf"
                                    onChange={changeFileHandler}
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4 bg-black text-white rounded py-2 hover:bg-[#272628] transition-colors" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4 bg-black text-white rounded py-2 hover:bg-[#272628] transition-colors">
                                    Update
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog