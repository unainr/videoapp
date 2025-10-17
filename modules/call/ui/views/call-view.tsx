'use client'
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { CallProvider } from '../components/call-provider';
interface Props {
	meetingId: string;
}
export const CallView = ({meetingId}:Props) => {
    const trpc = useTRPC();
        const { data } = useSuspenseQuery(
            trpc.meetings.getOne.queryOptions({ id: meetingId })
        );
        if(data.status==='completed'){
            return(
                <div className='flex flex-col min-h-screen justify-center items-center'>
                    Meeting has ended

                </div>
            )
        }
  return (
    <>
     <CallProvider
     meetingId={meetingId}
     meetingName={data.name}
     />  
    </>
  )
}
