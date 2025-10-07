"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingsDialog } from "./new-meetings-dialog";
import { MeetingsSearchFilters } from "./meetings-search-filters";
import { StatusFilter } from "./status-filter";
import { AgentIdFilters } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { DEFAULT_PAGE } from "@/lib/constants";


const MeetingsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [filters,setFilters] = useMeetingsFilters()
  const isAnyFilterModified = !!filters.search||!!filters.status ||!!filters.agentId;

  const onClearFilters = ()=>{
    setFilters({
      status:null,
      agentId:"",
      search:"",
      page:DEFAULT_PAGE,
    });
  }



    return (
    <div className="w-full flex justify-center">
       <NewMeetingsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className="mt-16 py-4 px-4 md:px-8 w-full max-w-5xl">
        <div className="flex items-center justify-between">
                <h5 className="font-medium text-lg">My Meetings</h5>
               <Button onClick={()=>setIsDialogOpen(true)}>
                    <PlusIcon />
                    New Meetings
                </Button>
            </div>
        <div className="flex items-center gap-x-2 p-1 ">
        <MeetingsSearchFilters/>
        <StatusFilter/>
        <AgentIdFilters/>
      {
        isAnyFilterModified&&(
          <Button variant={'outline'} onClick={onClearFilters}>
            <XCircleIcon className="size-4"/>
            Clear
          </Button>
        )
      }

        </div>
        </div>
        </div>
    );
};

export default MeetingsListHeader;
