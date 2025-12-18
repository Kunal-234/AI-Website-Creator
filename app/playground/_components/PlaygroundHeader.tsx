import { Button } from '@/components/ui/button'
import { OnSaveContext } from '@/context/OnSaveContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const PlaygroundHeader = () => {
  const{onSaveData,setOnSaveData}=useContext(OnSaveContext)
  return (
    <div className='flex justify-between items-center p-4 shadow'>
      <Image className='mx-3' src={'/logo1.svg'} alt='logo' height={50} width={50} />
      <Button className='border bg-white/20 px-6 text-white hover:bg-white/10' onClick={()=>setOnSaveData(Date.now())}>Save</Button>
    </div>
  )
}

export default PlaygroundHeader
