import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const PlaygroundHeader = () => {
  return (
    <div className='flex justify-between items-center p-4 shadow'>
      <Image className='mx-3' src={'/logo.svg'} alt='logo' height={50} width={50} />
      <Button>Save</Button>
    </div>
  )
}

export default PlaygroundHeader
