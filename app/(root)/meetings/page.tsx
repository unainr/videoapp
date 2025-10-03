import { MeetingsError, MeetingsLoading, MeetingView } from '@/modules/meetings/ui/views/meeting-view'
import { getQueryClient,trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Meetings = () => {
  const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<MeetingsLoading />}>
					<ErrorBoundary fallback={<MeetingsError />}>
						   <MeetingView/>
					</ErrorBoundary>
				</Suspense>
			</HydrationBoundary>
  )
}

export default Meetings
