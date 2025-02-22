import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (!data.name || !data.image || !data.email || !data.password) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all fields before submitting.',
            });
            return;
        }

        createUser(data.email, data.password)
            .then(() => {
                return updateUserProfile(data.name, data.image);
            })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Your account has been created successfully!',
                }).then(() => navigate('/'));
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message || 'Something went wrong during registration.',
                });
            });
    };

    return (
        <div className="flex flex-col justify-center items-center font-[sans-serif] bg-gradient-to-r from-[#3086B3] via-[#0FF0C8] to-[#3086B3] lg:h-screen p-6">
            <div className="bg-white max-w-md w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md overflow-hidden p-8">
                <h3 className="text-gray-800 text-3xl font-bold mb-6 text-center">Register</h3>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Name</label>
                        <input 
                            {...register('name', { required: true })} 
                            type="text" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all" 
                            placeholder="Enter name" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Image</label>
                        <input 
                            {...register('image', { required: true })} 
                            type="text" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all" 
                            placeholder="Enter Image Link" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Email</label>
                        <input 
                            {...register('email', { required: true })} 
                            type="email" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all" 
                            placeholder="Enter email" 
                        />
                    </div>
                    <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                        <input 
                            {...register('password', { required: true })} 
                            type="password" 
                            className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md border focus:bg-transparent focus:border-black outline-none transition-all" 
                            placeholder="Enter password" 
                        />
                    </div>

                    <button type="submit" className="cursor-pointer w-full py-3 px-6 text-sm tracking-wide rounded-md text-white bg-[#3086B3] hover:bg-[#11EEC8] focus:outline-none transition-all">
                        Sign up
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Register;
