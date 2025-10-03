'use client'
import ErrorState from '@/components/loading/error-state';
import LoadingState from '@/components/loading/loading-state';
import { useTRPC } from '@/trpc/client';
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

export const MeetingView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        {JSON.stringify(data)}
    </div>
  )
}


export const MeetingsLoading = () => { 
  return(
    <LoadingState title='Loading Meetings' description='This may take a few seconds'/>
  )
 }

 export const MeetingsError = () => {

  return(
    <ErrorState title='Failed to load meetings' description='Something went wrong'/>
  )
 }