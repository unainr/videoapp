import React, { Suspense } from "react";
import {
	AgentsView,
	AgentsError,
	AgentsLoading,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ListHeader from "@/modules/agents/ui/views/components/ListHeader";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";
interface Props{
	searchParams:Promise<SearchParams>
}
const AgentsPage = async ({searchParams}:Props)=> {
	const filters = await loadSearchParams(searchParams)
	const session = await auth.api.getSession({
		headers:await headers(),
	})
	if(!session){
		redirect('/sign-in')
	}
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...filters}));

	return (
		<>
    <ListHeader/>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<AgentsLoading />}>
					<ErrorBoundary fallback={<AgentsError />}>
						<AgentsView />
					</ErrorBoundary>
				</Suspense>
			</HydrationBoundary>
		</>
	);
};

export default AgentsPage;
