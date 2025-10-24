'use client'
import React from 'react'
import PlaygroundHeader from '../_components/PlaygroundHeader'
import ChatSection from '../_components/ChatSection'
import WebsiteDesign from '../_components/WebsiteDesign'
import ElementSetting from '../_components/ElementSetting'
import { useParams, useSearchParams } from 'next/navigation'

const Playground = () => {
    const {projectId} = useParams();
    const params = useSearchParams()
    const frameId = params.get('frameId')
    console.log(` ProjectId: ${projectId}, FrameId: ${frameId} `)
  return (
    <div>
      <PlaygroundHeader/>

      <div className='flex'>
      <ChatSection/>
      <WebsiteDesign/>
      <ElementSetting/>
      </div>

    </div>
  )
}

export default Playground
