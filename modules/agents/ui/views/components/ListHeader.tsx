"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useAgentFilters } from "@/modules/agents/hooks/use-agents-filters";
import { AgentsSearchFilters } from "./agents-search-filters";
import { DEFAULT_PAGE } from "@/lib/constants";

const ListHeader = () => {
	const [filters,setFilters] = useAgentFilters();
const [isDialogOpen, setIsDialogOpen] = useState(false);
const isAnyFilterModified = !!filters.search;
const onClearFitler = ()=>{
	setFilters({
		search:"",
		page:DEFAULT_PAGE,
	})
}
    return (
    <div className="w-full flex justify-center">
		<NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className="mt-16 py-4 px-4 md:px-8 w-full max-w-5xl">
        <div className="flex items-center justify-between">
				<h5 className="font-medium text-lg">My Agents</h5>
				<Button onClick={()=>setIsDialogOpen(true)}>
					<PlusIcon />
					New Agent
				</Button>
			</div>
		<div className="flex items-center gap-x-2 p-1 ">
		<AgentsSearchFilters/>
		{isAnyFilterModified&&(
			<Button variant={'outline'} size={'sm'} onClick={onClearFitler}>
				<XCircleIcon />
				Clear
			</Button>
		)}
		</div>
		</div>
        </div>
	);
};

export default ListHeader;
