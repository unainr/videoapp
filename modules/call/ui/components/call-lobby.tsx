'use client'
import React from "react";
import {
	DefaultVideoPlaceholder,
	StreamVideoParticipant,
	ToggleAudioPreviewButton,
	ToggleVideoPreviewButton,
	useCallStateHooks,
	VideoPreview,
} from "@stream-io/video-react-sdk";

import '@stream-io/video-react-sdk/dist/css/styles.css';

import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

interface Props {
	onJoin: () => void;
}

const DisableVideoPerview = () => { 
    const {data} = authClient.useSession();
    return(
        <DefaultVideoPlaceholder
        participant={{
            name:data?.user.name??'',
            image:data?.user.image??generateAvatarUri({
                seed:data?.user.name??"",
                varient:'initials'
            }),
        }as StreamVideoParticipant
    }
        />
    )
 }

 const AllowBrowerPermissions = () => { 
    return(
        <p className="text-sm">
            Please  grand your brower a permission to access your camera and microphone.
        </p>
    )
  }

export const CallLobby = ({ onJoin }: Props) => {
	const { useCameraState, useMicrophoneState } = useCallStateHooks();
	const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
	const { hasBrowserPermission: hasCameraPermission } = useCameraState();
	const hasBrowerMediaPermission = hasCameraPermission && hasMicPermission;
	return (
		<div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
			<div className="py-4 px-8 flex flex-1 items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
					<div className="flex flex-col gap-y-2 text-center">
						<h6>Ready to join?</h6>
						<p>Set up your call before joining</p>
					</div>
                    <VideoPreview
                    DisabledVideoPreview={
                    hasBrowerMediaPermission?DisableVideoPerview:AllowBrowerPermissions
                    }
                    
                    />

                    <div className="flex gap-x-3">
                    <ToggleAudioPreviewButton/>
                    <ToggleVideoPreviewButton/>
                    </div>
                    <div className="flex gap-x-3 justify-between w-full">
                        <Button asChild variant={'ghost'}>
                            <Link href={'/meetings'}>
                            Cancel
                            </Link>
                        </Button>
                        <Button onClick={onJoin}>
                            <LogInIcon/>
                            Join Call
                        </Button>
                    </div>
				</div>
			</div>
		</div>
	);
};
