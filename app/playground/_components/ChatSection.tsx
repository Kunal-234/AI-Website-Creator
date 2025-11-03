import React, { useState } from 'react'
import { Messages } from '../[projectId]/page'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

type Props = {
  messages: Messages[],
  onSend: any,
  loading: boolean
}

const ChatSection = ({ messages, onSend, loading }: Props) => {
  const [input, setInput] = useState<string>()

  const handleSend = () => {
    if (!input?.trim()) return;
    onSend(input)
    setInput('')
  }

  return (
    <div className='h-[91vh] w-96 shadow p-4 flex flex-col'>
      {/* Msg Section  */}
      <div className='flex-1 overflow-y-auto p-4 space-y-3 flex flex-col'>
        {messages.length === 0 ? <h2 className='text-gray-500 text-center mt-10'>No messages yet.</h2> : messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded ${msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
            <p className={`p-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-gray-100 text-black' : 'bg-gray-300 text-black'}`}>{msg.content}</p>
          </div>
        ))}

        {loading && <div className='flex justify-center items-center p-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-200'></div>
          <span className='ml-2 text-zinc-800'>Thinking... working on your request</span>
        </div>
        }

      </div>
      {/* footer input  */}
      <div className='p-3 border-t flex items-center gap-2 '>
        <textarea className='flex-1 border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2' placeholder='Describe your website design idea'
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
        <Button onClick={handleSend}><ArrowUp /></Button>
      </div>
    </div>
  )
}

export default ChatSection
