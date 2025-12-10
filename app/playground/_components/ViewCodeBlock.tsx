import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Copy } from 'lucide-react'

const ViewCodeBlock = ({children,code}:any) => {
  return (
      <Dialog>
      <form>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="min-w-5xl max-h-[600px] overflow-auto">

          <DialogHeader>
            <DialogTitle> <div className='flex justify-between items-center px-4'>Source Code<Button><Copy/></Button></div></DialogTitle>
            <DialogDescription>
                <div>
                    <SyntaxHighlighter
                        language="html"
                        style={atomOneDark}
                        wrapLines={true}
                        showLineNumbers={true}
                        customStyle={{ borderRadius: '8px', fontSize: '14px' }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </DialogDescription>
          </DialogHeader>


          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ViewCodeBlock
