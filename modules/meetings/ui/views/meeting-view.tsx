'use client'
import { DataTableMain } from '@/components/data-table-main';
import ErrorState from '@/components/loading/error-state';
import LoadingState from '@/components/loading/loading-state';
import { useTRPC } from '@/trpc/client';
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columnsmeeting } from '../components/columns';

export const MeetingView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
<div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-5'>        
        <DataTableMain data={data.items} columns={columnsmeeting}/>
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