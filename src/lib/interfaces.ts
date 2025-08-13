export interface LoginResponse {
    token: string;
}

export interface DecodedToken {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    country: string;
    email: string;
    created_at: string;
    updated_at: string;
}
