import React from 'react'
import Image from 'next/image';
import { CallControls,SpeakerLayout } from '@stream-io/video-react-sdk';
import Link from 'next/link';
interface Props{
    onLeave:()=>void;
    meetingName:string;
}
export const CallActive = ({onLeave,meetingName}:Props) => {
  return (
    <div className='flex flex-col justify-between p-5 h-full text-white'>
        <div className='bg-[#101213] rounded-full p-4 flex items-center gap-4'>
            <Link href={'/'} className='flex items-center justify-center p-1 bg-white/10 rounded-full'>
            Image Logo
            </Link>
            <h4>
                {meetingName}
            </h4>
        </div>
        <SpeakerLayout/>
        <div className='bg-[#101213] rounded-full px-4'>
            <CallControls onLeave={onLeave} />
        </div>
    </div>
  )
}
