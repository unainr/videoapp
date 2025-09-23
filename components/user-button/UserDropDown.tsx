" use client";
import React from "react";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserDropDown = () => {
	const { data: session } = authClient.useSession();
	return (
		<>
			{session ? (
				<div className="flex flex-row items-center justify-center gap-2">
					<h1 className="font-semibold">{session.user?.name}</h1>
					<Button
						onClick={() => authClient.signOut()}
						size={"icon"}
						variant={"ghost"}
						className=" rounded-full bg-slate-200 cursor-pointer">
						<LogOut className="w-4 h-4 text-red-500 " />
					</Button>
				</div>
			) : (
				<Link href="/sign-in">Sign In</Link>
			)}
		</>
	);
};

export default UserDropDown;
