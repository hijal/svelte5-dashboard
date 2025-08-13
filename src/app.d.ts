import type { DecodedToken } from '$lib/interfaces';

declare global {
    namespace App {
        interface Error {
            message: string;
            type: string;
            statusCode?: number;
            fieldErrors?: object;
        }
        interface Platform {
            env: Env;
            cf: CfProperties;
            ctx: ExecutionContext;
        }

        interface Locals {
            token?: string | null;
            isAuthenticated?: boolean;
            decodedToken: DecodedToken | null;
            validateToken: () => Promise<{
                token: string | null;
                valid: boolean;
                user: DecodedToken | null;
            }>;
        }
    }
}

export {};
