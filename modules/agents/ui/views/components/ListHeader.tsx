"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";

const ListHeader = () => {
const [isDialogOpen, setIsDialogOpen] = useState(false);
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
		</div>
        </div>
	);
};

export default ListHeader;
