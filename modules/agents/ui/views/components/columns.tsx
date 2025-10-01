"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { AgentGetOne } from "@/modules/agents/types";
import { ColumnDef } from "@tanstack/react-table";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";

export const columns: ColumnDef<AgentGetOne>[] = [
	{
		accessorKey: "name",
		header: "Agent Name",
		cell: ({ row }) => (
			<div className="flex flex-col gap-y-2">
				<div className="flex items-start gap-x-2">
					{/* Avatar */}
					<GeneratedAvatar
						variant="botttsNeutral"
						seed={row.original.name}
						className="size-6 shrink-0"
					/>

					{/* Content */}
					<div className="flex flex-col">
						{/* Name */}
						<span className="font-semibold capitalize">
							{row.original.name}
						</span>

						{/* Instructions with icon */}
						<div className="flex items-center gap-x-2 text-muted-foreground">
							<CornerDownRightIcon className="size-3 shrink-0" />
							<span className="text-sm max-w-[200px] truncate capitalize">
								{row.original.instructions}
							</span>
						</div>
					</div>
				</div>
			</div>
		),
	},
	{
		accessorKey: "meetingCount",
		header: "Meetings",
		cell: ({ row }) => (
			<Badge
				variant={"outline"}
				className="flex items-center gap-x-2 [&>svg]:size-4">
				<VideoIcon className="text-blue-600" />{row.original.meetingCount} {row.original.meetingCount ===1?'meeting':'meetings'}
			</Badge>
		),
	},
];
