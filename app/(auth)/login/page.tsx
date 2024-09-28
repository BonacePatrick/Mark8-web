import LoginForm from '@/components/auth/login/LoginForm'
import RegisterPrompt from '@/components/auth/register/RegisterPrompt'
import { Logo } from '../../assets'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: 'Login | Mark8',
  description: 'Login to Mark8',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen text-black login-bg flex flex-col justify-center items-center px-3 md:px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Left side */}
        <div className="bg-gray-50 p-3 lg:p-10 hidden md:flex flex-col justify-between md:w-[50%] min-h-[65vh]">
          <div>
            <div className="flex flex-col justify-start items-start mb-6">
              <div className="text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Image alt='logo' src={Logo}/>
              </div>
              <div className='mt-20'>
                <h1 className="text-2xl font-bold mb-2">Mark8</h1>
                <p className="text-sm text-black font-thin">By Awesomity Lab</p>
              </div>
            </div>
          </div>
          <div className="text-xs text-black">
            © 2024 Awesomity Lab
          </div>
        </div>
        
        {/* Right side */}
        <div className="p-8 md:w-2/3">
          <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>
          <LoginForm />
        </div>
      </div>
      <RegisterPrompt />
    </div>
  )
}