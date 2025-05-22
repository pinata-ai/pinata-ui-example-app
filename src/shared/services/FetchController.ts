type RequestMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "CONNECT"
    | "TRACE";

type Primitive = string | number | boolean;

export class NetworkError extends Error {
    statusCode?: number;
    errorCode?: number;
    serviceMessage?: string;

    constructor(statusCode: number, errorCode?: number, serviceMessage?: string) {
        super(
            `Response status code: ${statusCode}${
                errorCode ? `; Error code: ${errorCode}.` : ""
            }${serviceMessage ? `; Message: ${serviceMessage}.` : ""}`
        );
        this.name = "NetworkError";
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.serviceMessage = serviceMessage;
    }
}

export class FetchController {
    private baseUrl;
    headers?: Record<string, string>;

    constructor({
                    baseUrl,
                    headers,
                }: {
        baseUrl: string;
        headers?: Record<string, string>;
    }) {
        this.headers = headers;
        this.baseUrl = baseUrl;
    }

    private async request<ResponseData>(
        urlPath: string,
        params?: Record<string, Primitive> | string,
        headers?: Record<string, string>,
        abortSignal?: AbortSignal,
        method: RequestMethod = "GET"
    ): Promise<ResponseData> {
        const fullUrl = new URL(urlPath, this.baseUrl);

        const requestInit: RequestInit = {
            method,
            headers: {...this.headers, ...headers},
            signal: abortSignal,
        };

        if (params) {
            if (method === "GET") {
                if (typeof params === "object") {
                    const stringifyedParams: Record<string, string> = {};
                    Object.keys(params).forEach((key) => {
                        stringifyedParams[key] = params[key].toString();
                    });
                    fullUrl.search = new URLSearchParams(stringifyedParams).toString();
                } else {
                    fullUrl.search = params;
                }
            } else {
                requestInit.body =
                    typeof params === "string" ? params : JSON.stringify(params);
            }
        }

        const response = await fetch(fullUrl, requestInit);
        let json = null;
        try {
            json = await response.json();
        } catch {
            // ignore JSON parsing errors
        }

        if (!response.ok) {
            const error = new NetworkError(
                response.status,
                json?.code ? Number(json.code) : undefined,
                json?.message
            );
            console.error(error);
            throw error;
        }

        return json;
    }

    get<ResponseData>(
        urlPath: string,
        params?: Record<string, Primitive>,
        headers?: Record<string, string>,
        abortSignal?: AbortSignal
    ) {
        return this.request<ResponseData>(urlPath, params, headers, abortSignal);
    }

    post<ResponseData>(
        urlPath: string,
        params?: Record<string, Primitive> | string,
        headers?: Record<string, string>,
        abortSignal?: AbortSignal
    ) {
        return this.request<ResponseData>(
            urlPath,
            params,
            headers,
            abortSignal,
            "POST"
        );
    }

    put<ResponseData>(
        urlPath: string,
        params?: Record<string, Primitive>,
        headers?: Record<string, string>,
        abortSignal?: AbortSignal
    ) {
        return this.request<ResponseData>(
            urlPath,
            params,
            headers,
            abortSignal,
            "PUT"
        );
    }

    remove<ResponseData>(
        urlPath: string,
        params?: Record<string, Primitive>,
        headers?: Record<string, string>,
        abortSignal?: AbortSignal
    ) {
        return this.request<ResponseData>(
            urlPath,
            params,
            headers,
            abortSignal,
            "DELETE"
        );
    }
}
