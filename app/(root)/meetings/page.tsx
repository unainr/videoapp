import { auth } from '@/lib/auth';
import { loadSearchParamsMeeting } from '@/modules/meetings/params';
import MeetingsListHeader from '@/modules/meetings/ui/components/meetings-list-header';
import { MeetingsError, MeetingsLoading, MeetingView } from '@/modules/meetings/ui/views/meeting-view'
import { getQueryClient,trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';


interface Props{
	searchParams:Promise<SearchParams>
}

const Meetings = async ({searchParams}:Props) => {
	const filters = await loadSearchParamsMeeting(searchParams)
	const session = await auth.api.getSession({
			headers:await headers(),
		})
		if(!session){
			redirect('/sign-in')
		}
  const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
		...filters
	}));
  return (
	<>
	<MeetingsListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<MeetingsLoading />}>
					<ErrorBoundary fallback={<MeetingsError />}>
						   <MeetingView/>
					</ErrorBoundary>
				</Suspense>
			</HydrationBoundary>
	</>
  )
}

export default Meetings
