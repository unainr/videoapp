"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import UserDropDown from "../user-button/UserDropDown";

export default function MainHeader() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-200 ${
				isScrolled ? "bg-background/60 backdrop-blur-md" : ""
			}`}>
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex items-center space-x-2">
					<span className="relative z-10 text-2xl font-black tracking-tighter">
						<span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
							D
						</span>
						<span className="bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
							iagram
						</span>
						{/* Decorative Elements */}
						<span className="absolute -right-1.5 -top-1.5 h-2 w-2 animate-ping rounded-full bg-gradient-to-r from-blue-500 to-blue-500 opacity-75" />
						<span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow-md" />
					</span>
				</Link>
				<nav className="hidden gap-6 md:flex justify-center  items-center">
					{/* <Link
						href="/generate"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						Generate
					</Link> */}
					{/* <Link
						href="/about"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						About
					</Link>
					<Link
						href="#testimonials"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						Testimonials
					</Link>
					<Link
						href="#faq"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						FAQ
					</Link> */}
				</nav>
				<div className="md:flex items-center justify-center gap-4 sm:block hidden">
					<UserDropDown />
						<Link
						href="/generate"
						className="text-sm text-gray-500 dark:text-white font-medium hover:text-primary">
						All Chats
					</Link> 
			
				</div>
			</div>
		</header>
	);
}
