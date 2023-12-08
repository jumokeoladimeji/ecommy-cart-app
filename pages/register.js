import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Link from "next/link";
import { signup } from "@/pages/api/user";

export default Register;

function Register() {
    const router = useRouter();
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        name: Yup.string()
            .required('name is required'),
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        phoneNumber: Yup.string()
            .required('Phone Number is required')
            .min(11, 'Phone Number must be at least 11 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        signup(user) 
    }

    return (

            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                {/* <h4>Register</h4> */}
                <div className='hidden sm:block'>
                    <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80" alt="" />
                </div>
                <div className='bg-gray-100 flex flex-col justify-center'>
                    <form className='max-w-[400px] w-full mx-auto bg-white p-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col py-2'>
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`border p-2 ${errors.username ? 'is-invalid' : ''}`} />
                            {/* <div className='border p-2'>{errors.username?.message}</div> */}
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Name</label>
                            <input name="name" type="text" {...register('name')} className={`border p-2 ${errors.name ? 'is-invalid' : ''}`} />
                            {/* <div className='border p-2'>{errors.name?.message}</div> */}
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Email</label>
                            <input name="email" type="email" {...register('email')} className={`border p-2`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`border p-2 ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Phone Number</label>
                            <input name="phoneNumber" type="tel" {...register('phoneNumber')} className={`border p-2 ${errors.phoneNumber ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
                        </div>
                        {/* <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button> */}
                        <button type="submit" className='border w-full my-5 py-2 bg-emerald-50 text-emerald-500 disabled:text-white hover:bg-emerald-500 hover:text-white transition-colors duration-500 rounded-md w-100 disabled:bg-slate-300 disabled:cursor-not-allowed'>
                            Register
                        </button>
                        {/* <Link href="/login" className="btn btn-link"><p className="bg-white underline underline-offset-4 decoration-2 decoration-emerald-500">Cancel</p></Link> */}
                    </form>
                </div>
            </div>

    );
}
