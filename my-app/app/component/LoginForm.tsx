"use client"
import { useAuthStore } from '@/store/authStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const userSchema = z.object({
    email: z.string().min(1, "Email is required"), 
    password: z.string().min(1, "Password is required"), 
})
type User = z.infer<typeof userSchema>
export default function LoginForm() {
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    // const clearTokens = useAuthStore((state) => state.clearTokens);
    const {register, handleSubmit, formState: {errors},reset} = useForm<User>({
        resolver: zodResolver(userSchema)
    })

    const formData = new FormData();

    const router = useRouter();
    const onSubmit = async (data:User)=>{
        formData.append('email', data.email);
        formData.append('password', data.password);
        try{
            console.log("Submitting data:", data);  // Log the data being sent

            const res =await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify(data)
            })
            console.log("Submitting data:", formData);  // Log the data being sent

            if (res.ok) {
                const resData = await res.json();
                setAccessToken(resData.accessToken);
                setRefreshToken(resData.refreshToken);
                setIsAuthenticated(true);
                router.push('/user/profile')
    
                console.log("data posted");
                reset(); // Reset the form after successful submission
            } else {
                console.error("Failed to post data");
             }
        }catch(error){
            console.log(error);
        }
        

    }
  return (
    <div>
        <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-md mx-auto mt-12 border border-solid border-black p-8 gap-3'>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" {...register('email')} className='ring-1 ring-offset-1 ring-gray-500' />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register('password')} className='ring-1 ring-offset-1 ring-gray-500' />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            <button type="submit">Submit</button>
        </form>

      
    </div>
  )
}
