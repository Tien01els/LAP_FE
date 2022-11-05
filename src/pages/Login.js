import React from 'react'

import { useForm } from 'react-hook-form'
import Button from '../components/Button'

//img
import coverImg from '../assets/image/Login.jpg'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // goi dang nhap o day ne nhoc
  const onSubmit = (data) => console.log(data)

  return (
    <div className="flex flex-row w-full h-screen">
      {/* left */}
      <div className="w-[50%]">
        <img src={coverImg} alt="" className="h-full" />
      </div>
      {/* right - login form*/}
      <div className="w-[50%] flex">
        <div className="flex flex-col bg-primary justify-center items-center w-full">
          <form
            className="flex flex-col gap-6 bg-white px-16 pb-24 pt-14 items-center rounded-lg justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <span className="text-xl text-primary">
              Welcome to{' '}
              <span className="font-semibold text-2xl">E-learning</span>
            </span>
            <div className="flex flex-col w-full gap-2">
              {errors.email && (
                <span className="text-xs px-2 text-red-400">
                  {errors.email.message}
                </span>
              )}
              <input
                placeholder="Email"
                className={`outline-primary border transition-all border-primary rounded-lg px-3 py-2 ${
                  errors.email ? 'outline-red-500' : 'outline-primary'
                } `}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Please enter valid Email',
                  },
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              {errors.password && (
                <span className="text-xs px-2 text-red-400">
                  {errors.password.message}
                </span>
              )}
              <input
                placeholder="Password"
                type="password"
                className="outline-primary border  transition-all border-primary rounded-lg px-3 py-2"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: 'Please enter at least 8 letters and 1 number.',
                  },
                })}
              />
            </div>
            <Button type="submit" className="w-full ">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
