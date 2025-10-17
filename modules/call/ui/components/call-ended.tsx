'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";


export const CallEnded = () => {
	
	return (
		<div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
			<div className="py-4 px-8 flex flex-1 items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
					<div className="flex flex-col gap-y-2 text-center">
						<h6>You have ended the call</h6>
						<p>Summary will appear in a few minutes.</p>
					</div>
                    <Button asChild >
                        <Link href={'/meetings'}>
                        Back to meetings
                        </Link>
                    </Button>

                  
                   
				</div>
			</div>
		</div>
	);
};
