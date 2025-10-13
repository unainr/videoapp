import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
    meetingId: string;
  
}

const ActiveState = ({ meetingId }: Props) => {
    return (
        <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
            
            <Link href={`/call/${meetingId}`}>
                <Button  className="w-full lg:w-auto">
                    <VideoIcon />
                    Join meeting
                </Button>
            </Link>
        </div>
    );
};

export default ActiveState;
