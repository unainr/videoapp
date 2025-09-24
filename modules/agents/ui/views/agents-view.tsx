'use client'
import React from 'react'
import {  useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import LoadingState from '@/components/loading/loading-state'
import ErrorState from '@/components/loading/error-state'
export const AgentsView = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
    <div className='flex flex-col items-center justify-center min-h-screen max-w-4xl'>
      {JSON.stringify(data,null,2)}
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
