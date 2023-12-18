import { useState } from "react";
/**
 * A cool hack to catch async errors with ErrorBoundary
 */
export const useThrowAsyncError = () => {
	const [state, setState] = useState();

	return (error: React.FormEvent<HTMLFormElement>) => {
		setState(() => {
		console.log("useThrowAsyncError", error, state);
		throw error;
		});
	}
}
