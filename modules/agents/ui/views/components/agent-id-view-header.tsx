import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuItem,DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon,TrashIcon,PencilIcon,MoreVerticalIcon } from "lucide-react";
interface Props {
	agentId: string;
	agentName: string;
	onEdit: () => void;
	onRemove: () => void;
}
export const AgentIdViewHeader = ({
	agentId,
	agentName,
	onEdit,
	onRemove,
}: Props) => {
	return (
		<div className="flex justify-between px-6 py-4">
			<Breadcrumb>
				<BreadcrumbList className="flex items-center gap-2 text-sm text-muted-foreground">
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/agents" className="hover:underline">
								My Agents
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator>
						<ChevronRightIcon className="w-4 h-4" />
					</BreadcrumbSeparator>

					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link
								href={`/agents/${agentId}`}
								className="font-medium text-foreground">
								{agentName}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'}>
                        <MoreVerticalIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                        <PencilIcon className="size-4 text-black"/>
                        Edit
                    </DropdownMenuItem>

                        <DropdownMenuItem onClick={onRemove}>
                        <TrashIcon className="size-4 text-black"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
		</div>
	);
};
