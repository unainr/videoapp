import React from "react";
import { CommandDialog, CommandInput, CommandItem, CommandList } from "../ui/command";
import { CommandProps } from "@/types";

const CommandButtonInput = ({open , setOpen}:CommandProps) => {
	return (
		<>
			<CommandDialog open={open} onOpenChange={setOpen} >
				<CommandInput 
                placeholder="Find a meeting or agent"
                />
                <CommandList>
                    <CommandItem>
                        Test
                    </CommandItem>
                </CommandList>
			</CommandDialog>
		</>
	);
};

export default CommandButtonInput;
