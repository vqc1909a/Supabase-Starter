import React from "react";
import {Nav} from "../nav";
import {hasEnvVars} from "@/lib/utils";
import {EnvVarWarning} from "../env-var-warning";
import {AuthButton} from "../auth-button";

export const Header = () => {
	return (
		<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
			<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
				<Nav />
				{!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
			</div>
		</nav>
	);
};
