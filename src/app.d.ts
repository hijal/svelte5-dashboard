declare global {
    namespace App {
        interface Platform {
            env: Env;
            cf: CfProperties;
            ctx: ExecutionContext;
        }

        interface Locals {
            token?: string | null;
            isAuthenticated?: boolean;
            user: {
                id: number;
                email: string;
                iat: number;
                exp: number;
            } | null;
            validateToken: () => Promise<{
                valid: boolean;
                user: {
                    id: number;
                    email: string;
                    iat: number;
                    exp: number;
                } | null;
            }>;
        }
    }
}

export {};
