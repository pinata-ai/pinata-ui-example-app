import {FetchController} from "./FetchController";
import {generateHMACSignature} from "../utils";

type TokenPair = {
    accessToken: string;
    refreshToken: string;
};

const PROD_URL = "https://www.pinata.ai/partners/api/v1/";
const DEV_URL = process.env.BASE_URL as string;

export class PinataService {
    private _fetchController: FetchController;

    constructor(isProd: boolean = false) {
        this._fetchController = new FetchController({
            baseUrl: isProd
                ? PROD_URL
                : DEV_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    auth = {
        getCompanyTokens: async (
            {
                clientID,
                clientKey,
                clientSecret,
            }: {
                clientID: string;
                clientKey: string;
                clientSecret: string;
            },
            abortSignal?: AbortSignal
        ) => {
            const payload = JSON.stringify({clientId: clientID, clientKey});

            return (
                await this._fetchController.post<{
                    data: TokenPair;
                }>(
                    "auth/retrieve-token/",
                    payload,
                    {Signature: generateHMACSignature(payload, clientSecret)},
                    abortSignal
                )
            ).data;
        },
        getUserTokens: async (
            {
                companyAccessToken,
                userEmail,
            }: {
                companyAccessToken: string;
                userEmail: string;
            },
            abortSignal?: AbortSignal
        ) => {
            return (
                await this._fetchController.post<{
                    data: TokenPair;
                }>(
                    "auth/retrieve-user-token/",
                    {email: userEmail},
                    {
                        Authorization: `Token ${companyAccessToken}`,
                    },
                    abortSignal
                )
            ).data;
        },
    };
}
