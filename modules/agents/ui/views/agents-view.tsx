'use client'
import React from 'react'
import {  useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import LoadingState from '@/components/loading/loading-state'
import ErrorState from '@/components/loading/error-state'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useAgentFilters } from '../../hooks/use-agents-filters'
import { DataPagination } from './components/data-pagination'
import { useRouter } from 'next/navigation'
import { DataTableMain } from '@/components/data-table-main'


export const AgentsView = () => {
  const router = useRouter()
    const [filters,setFilters] = useAgentFilters();
  
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters}))

    return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-5'>
     <DataTableMain data={data.items} columns={columns}
     onRowClick={(row)=>router.push(`/agents/${row.id}`)}
     />
     <DataPagination
     page={filters.page}
     totalPages={data.totalPages}
     onPageChange={(page)=>setFilters({page})}
     
     />
    </div>
  )
}


export const AgentsLoading = () => { 
  return(
    <LoadingState title='Loading Agents' description='This may take a few seconds'/>
  )
 }

 export const AgentsError = () => {

  return(
    <ErrorState title='Failed to load agents' description='Something went wrong'/>
  )
 }
