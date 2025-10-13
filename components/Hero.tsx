'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { ArrowUp, HomeIcon, ImagePlus, Key, LayoutDashboard, User } from 'lucide-react'
import { SignInButton } from '@clerk/nextjs';

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

  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
      {/* Header and desc S */}
      <h2 className='font-bold text-6xl'>What should we Design?</h2>
      <p className='mt-2 text-xl text-gray-500'>Generate, Edit and Explore desig with AI, Export code as well</p>

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
          <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
          {}
            <Button disabled={!userInput} size={'sm'}>
              <ArrowUp />
            </Button>
          </SignInButton>
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
