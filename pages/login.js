import React, { useContext } from 'react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Router from 'next/router';

import { cookies } from 'next/headers';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { signin } from '@/pages/api/user';
import { UserContext } from './context/userContext';
// import loginImg from '@/assets/login.jpeg'

export default function Login() {
	const { loginUser } = useContext(UserContext);
	// form validation rules
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required'),
		password: Yup.string().required('Password is required'),
	});
	const formOptions = {
		resolver: yupResolver(validationSchema),
	};
	// get functions to build form with useForm() hook
	const { register, handleSubmit, setError, formState } =
		useForm(formOptions);
	const { errors } = formState;

	async function onSubmit(user) {
		const signInUser = await signin(user, loginUser);
		Router.push('/');
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
			<div className="hidden sm:block">
				{/* <Image src='/login.jpeg' alt={''} width={24} height={24} /> */}
				<Image
					src={'/login.jpeg'}
					alt={''}
					width={300}
					height={400}
					className="w-full h-full object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				{/* <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80" alt="" /> */}
			</div>

			<div className="bg-gray-100 flex flex-col justify-center">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="max-w-[400px] w-full mx-auto bg-white p-4"
				>
					<div className="flex flex-col py-2">
						<label>Email</label>
						<input
							name="email"
							type="email"
							{...register('email')}
							className={`border p-2`}
						/>
						<div className="invalid-feedback">
							{errors.email?.message}
						</div>
					</div>
					<div className="flex flex-col py-2">
						<label>Password</label>
						<input
							name="password"
							type="password"
							{...register('password')}
							className={`border p-2 ${
								errors.password ? 'is-invalid' : ''
							}`}
						/>
						<div className="invalid-feedback">
							{errors.password?.message}
						</div>
					</div>
					<button className="border w-full my-5 py-2 bg-emerald-50 text-emerald-500 disabled:text-white hover:bg-emerald-500 hover:text-white transition-colors duration-500 rounded-md w-100 disabled:bg-slate-300 disabled:cursor-not-allowed">
						Sign In
					</button>
					{/*  py-3 px-5  */}
					<div className="flex justify-between">
						<Link href="/register">
							<p className="bg-white underline underline-offset-4 decoration-2 decoration-emerald-500">
								Not a member? Sign up now
							</p>
						</Link>
						{/* <a className='text-center mt-8' href='/register'>Not a member? Sign up now</a> */}
					</div>
					{/* <div className='flex justify-between'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    </div> */}
					<div className="flex justify-between">
						<p className="text-center">
							Forgot Username or Password?
						</p>
					</div>
				</form>
			</div>
			{/* <img className='absolute w-full h-full object-cover mix-blend-overlay' src="@/assets/login.jpeg" alt="/" /> */}
		</div>
	);
}
