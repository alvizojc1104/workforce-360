/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

// Extending AxiosError to allow dynamic keys in `response.data`
export interface CustomAxiosError<T = unknown> extends AxiosError {
	response: {
		data: T & Record<string, any>; // Allows additional dynamic keys in `data`
		status: number;
		statusText: string;
		headers: Record<string, any>;
		config: any;
	};
}
