import { MeetingIdView, MeetingsIdViewError, MeetingsIdViewLoading } from '@/modules/meetings/ui/views/meeting-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
interface Props {
  params:Promise<{
    meetingId:string;
  }>
}
const page = async ({params}:Props) => {
  const {meetingId} = await params
   const queryClient = getQueryClient()
      void queryClient.prefetchQuery(
         trpc.meetings.getOne.queryOptions({id:meetingId})
      )
  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsIdViewLoading/>}>
            <ErrorBoundary fallback={<MeetingsIdViewError/>}>
              <MeetingIdView meetingId={meetingId}/>
            </ErrorBoundary>
          </Suspense>
    </HydrationBoundary>
  )
}

export default page
