import React, { Dispatch, SetStateAction } from "react";

export interface LayoutProps {
	children: React.ReactNode;
}

// Command button types

export interface CommandProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

// loading state types
export  interface LoadingProps{
title:string;
description:string
}

// ResponsiveDialogProps
export interface ResponsiveDialogProps{
	title:string;
	description:string;
	children:React.ReactNode;
	open:boolean;
	onOpenChange:( open:boolean)=>void
}

// AgentPropsDialog
export interface NewAgentDialogProps{
    open:boolean;
    onOpenChange:(open:boolean)=>void
}