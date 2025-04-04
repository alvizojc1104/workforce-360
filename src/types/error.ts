export type APIError = {
	response: {
		data: {
			statusCode: number;
			timestamp: string;
			message: string | Array<string>;
			path: string;
			detail: string;
		};
	};
};