import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
	meetingId: string;
	onCancelMeeting: () => void;
	isCancelling: boolean;
}

const UpcomingState = ({ meetingId, onCancelMeeting, isCancelling }: Props) => {
	return (
		<div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
			<Button
				variant={"secondary"}
				className="w-full lg:w-auto"
				onClick={onCancelMeeting}
                disabled={isCancelling}
                >
				<BanIcon />
				Cancel meeting
			</Button>
			<Link href={`/call/${meetingId}`}>
				<Button disabled={isCancelling} className="w-full lg:w-auto">
					<VideoIcon />
					Start meeting
				</Button>
			</Link>
		</div>
	);
};

export default UpcomingState;
