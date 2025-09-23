'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { SearchIcon } from 'lucide-react'
import CommandButtonInput from './command-button'

const SearchButton = () => {
  const [commandOpen, setCommandOpen] = useState(false)
  useEffect(() => {
    const down = (e:KeyboardEvent)=> {
        if(e.key==='k'&&(e.metaKey||e.ctrlKey)){
            e.preventDefault();
            setCommandOpen((open)=>!open);
        }
    }

    document.addEventListener('keydown',down)
    return ()=> document.removeEventListener('keydown',down);
  
  }, [])
  
    return (
    <>
    <CommandButtonInput open={commandOpen} setOpen={setCommandOpen} />
      <Button onClick={() => setCommandOpen((open)=>!open)}  className='h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground' size={'sm'} variant={'outline'} >
    <SearchIcon/>
    Search
    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
        <span className='text-xs'>&#8984;</span>K
    </kbd>
      </Button>
    </>
  )
}

export default SearchButton
