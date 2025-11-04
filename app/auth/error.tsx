"use client"; // Error components must be Client Components

import {useEffect} from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & {digest?: string};
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="w-full max-w-lg mx-auto bg-card text-card-foreground rounded-lg shadow-xl space-y-6 py-8 px-4 lg:py-16 lg:px-6 text-center">
			<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
				500
			</h1>
			<p className="mb-4 text-3xl tracking-tight font-bold text-primary md:text-4xl">
				Internal Server Error.
			</p>
			<p className="mb-4 text-lg font-light text-gray-500">
				We are already working to solve the problem.{" "}
			</p>
			<button
				className="inline-flex border-2 border-primary-600 bg-background text-foreground bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	);
}
