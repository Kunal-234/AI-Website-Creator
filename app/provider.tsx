'use client'
import { OnSaveContext } from '@/context/OnSaveContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>()
  const[onSaveData,setOnSaveData]=useState<any>(null)

  useEffect(() => {
    user && createNewUser()
  }, [user])

  const createNewUser = async () => {
    try {
      // Include credentials so the browser sends Clerk's session cookie to the API
      const result = await axios.post('/api/users', {}, { withCredentials: true })
      console.log(result)
      // setUserDetail(result.data?.user)
    } catch (error) {
      console.log('internal server error', error)
    }
  }

  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <OnSaveContext.Provider value={{onSaveData,setOnSaveData}}>
          {children}
        </OnSaveContext.Provider>
      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider
