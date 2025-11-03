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
		<div className="flex items-center justify-center min-h-screen from-gray-800 via-greeen-300 to-blue-500 bg-gradient-to-br">
			<div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
				<div className="max-w-md mx-auto space-y-6">
					<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
						<div className="mx-auto max-w-screen-sm text-center">
							<h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
								500
							</h1>
							<p className="mb-4 text-3xl tracking-tight font-bold text-black md:text-4xl">
								Internal Server Error.
							</p>
							<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
								We are already working to solve the problem.{" "}
							</p>
							<button 
								className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
								onClick={
									// Attempt to recover by trying to re-render the segment
									() => reset()
								}
							>
								Try again
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
