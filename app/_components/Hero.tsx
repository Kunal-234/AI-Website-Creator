'use client'
import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import { ArrowUp, HomeIcon, ImagePlus, Key, LayoutDashboard, Loader2Icon, User } from 'lucide-react'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const suggestions = [
  {
    label: 'Dashboard',
    prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS',
    icon: LayoutDashboard,
  },
  {
    label: 'SignUp Form',
    prompt: 'Create a modern sign up form with email/password fields, Google and Github login options, and terms checkbox',
    icon: Key,
  },
  {
    label: 'Hero',
    prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a title with a subtle gradient effect, subtitle, CTA, small social proof and an image.',
    icon: HomeIcon,
  },
  {
    label: 'User Profile Card',
    prompt: 'Create a modern user profile card component for a social media website',
    icon: User,
  },
];

const Hero = () => {

  const [userInput, setUserInput] = useState<string>('');
  const {user} = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const CreateNewProject = async()=>{
    setLoading(true);
    const projectId = uuidv4();
    const frameId = generateRandomFrameNumber();
    const messages=  [{
          role: 'user',
          content: userInput
        }]
    try {
      const result = await axios.post('/api/projects',{
        projectId,
        frameId,
        messages
      })
      console.log(result.data)
      toast.success('Project created successfully')
      router.push(`/playground/${projectId}?frameId=${frameId}`);
      setLoading(false);
    } catch (error) {
      toast.error('Error creating project')
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
      {/* Header and desc S */}
      <UserButton/>
      <h2 className='font-bold text-6xl'>What should we Design?</h2>
      <p className='mt-2 text-xl text-gray-500'>Generate, Edit and Explore Design with AI, Export code as well</p>

      {/* input box */}
      <div className='w-full max-w-2xl px-5 pt-5 pb-2 border mt-5 rounded-2xl'>
        <textarea placeholder='Describe your page design'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className='w-full h-24 focus:outline-none focus:ring-0 resize-none'></textarea>
        <div className='flex justify-between items-center'>
          <Button variant={'ghost'}>
            <ImagePlus />
          </Button>
        {!user ? 
         <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
            <Button disabled={!userInput} size={'sm'}>
              <ArrowUp />
            </Button>
          </SignInButton> :
          // <Link href={'/workspace'}>
            <Button disabled={!userInput || loading}
            onClick={CreateNewProject}
             size={'sm'}>
           {loading? <Loader2Icon className='animate-spin'/> : <ArrowUp /> } 
            </Button>
          // </Link>
        } 
         
        </div>
      </div>
      {/* Suggestions */}
      <div className='mt-4 flex gap-3'>
        {suggestions.map((suggestion, i) => (
          <Button key={i}
            onClick={() => setUserInput(suggestion.prompt)}
            variant={'outline'} >
            <suggestion.icon />
            {suggestion.label}</Button>
        ))}
      </div>

    </div>
  )
}

export default Hero


const generateRandomFrameNumber = () => {
  const num = Math.floor(Math.random() * 10000);
  return num;
}