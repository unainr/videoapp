import React, { Suspense } from 'react'
import  {AgentsView, AgentsError, AgentsLoading } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {ErrorBoundary} from 'react-error-boundary'

const AgentsPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsLoading/>} >
<ErrorBoundary fallback={<AgentsError/>} >

     <AgentsView/> 
</ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
    </>
  )
}

export default AgentsPage
