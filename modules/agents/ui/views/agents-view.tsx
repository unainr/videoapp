'use client'
import React from 'react'
import {  useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import LoadingState from '@/components/loading/loading-state'
import ErrorState from '@/components/loading/error-state'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'


export const AgentsView = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-5'>
     <DataTable data={data} columns={columns}/>
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
