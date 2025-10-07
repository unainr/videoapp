'use client'
import { DataTableMain } from '@/components/data-table-main';
import ErrorState from '@/components/loading/error-state';
import LoadingState from '@/components/loading/loading-state';
import { useTRPC } from '@/trpc/client';
import {  useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columnsmeeting } from '../components/columns';
import { useRouter } from 'next/navigation';
import { useMeetingsFilters } from '../../hooks/use-meetings-filter';
import { DataPagination } from '@/modules/agents/ui/views/components/data-pagination';

export const MeetingView = () => {
  const router = useRouter()
   const [filters,setFilters] = useMeetingsFilters()
  
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
      ...filters
    }));
  return (
<div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-5'>        
        <DataTableMain data={data.items} columns={columnsmeeting}  onRowClick={(row)=>router.push(`/meetings/${row.id}`)}/>
        <DataPagination
             page={filters.page}
             totalPages={data.totalPages}
             onPageChange={(page)=>setFilters({page})}
             
             />
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