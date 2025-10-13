"use client";
import ErrorState from "@/components/loading/error-state";
import LoadingState from "@/components/loading/loading-state";
import { useTRPC } from "@/trpc/client";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { toast } from "sonner";
import { useConfirm } from "@/modules/agents/hooks/use-confirm";
import { UpdateMeetingsDialog } from "../components/update-meetings-dialog";
import UpcomingState from "../components/upcoming-state";
import ActiveState from "../components/active-state";
import CancelledState from "../components/cancelled-state";
import ProcessingState from "../components/processing-state";

interface Props {
	meetingId: string;
}
export const MeetingIdView = ({ meetingId }: Props) => {
	const [updateMeetingDialogOpen, setupdateMeetingDialogOpen] = useState(false);
	const router = useRouter();
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const { data } = useSuspenseQuery(
		trpc.meetings.getOne.queryOptions({ id: meetingId })
	);
	//  remove meeting
	const removeMeeting = useMutation(
		trpc.meetings.remove.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(
					trpc.meetings.getMany.queryOptions({})
				);
				router.push("/meetings");
			},
			onError: (error) => {
				toast.error(error.message);
			},
		})
	);
	// confirmation
	const [RemoveConfirmation, confirmRemove] = useConfirm(
		"Are Your sure?",
		`The following action will action remove this meeting`
	);

	const handleRemoveMeeting = async () => {
		const ok = await confirmRemove();
		if (!ok) return;
		await removeMeeting.mutateAsync({ id: meetingId });
	};

	const isActive = data.status === 'active';
	const isUpcoming = data.status === 'upcoming';
	const isCancelled = data.status === 'cancelled';
	const isCompleted = data.status === 'completed';
	const isProcessing = data.status === 'processing';


	return (
		<>
			<RemoveConfirmation />
			<UpdateMeetingsDialog
				open={updateMeetingDialogOpen}
				onOpenChange={setupdateMeetingDialogOpen}
				initialValues={data}
			/>
			<div className="flex-1 pt-16 py-4 px-4 md:px-8 flex flex-col gap-y-4">
				<MeetingIdViewHeader
					meetingId={meetingId}
					meetingName={data.name}
					onEdit={() => setupdateMeetingDialogOpen(true)}
					onRemove={handleRemoveMeeting}
				/>
				{isCancelled &&<CancelledState/>}
				{isProcessing &&<ProcessingState/>}
				{isCompleted &&<div>Completed</div>}
				{isActive && <ActiveState meetingId={meetingId} />}
				{isUpcoming &&(<UpcomingState
				meetingId={meetingId}
				onCancelMeeting={()=>{}}
				isCancelling={false}
				
				/>
				)}
			</div>
		</>
	);
};

// Loading state

export const MeetingsIdViewLoading = () => {
	return (
		<LoadingState
			title="Loading Meetings"
			description="This may take a few seconds"
		/>
	);
};

export const MeetingsIdViewError = () => {
	return (
		<ErrorState
			title="Error Loading Meetings"
			description="Something went wrong"
		/>
	);
};
