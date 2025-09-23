import { Dispatch, SetStateAction } from "react";

export interface LayoutProps {
	children: React.ReactNode;
}

// Command button types

export interface CommandProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
