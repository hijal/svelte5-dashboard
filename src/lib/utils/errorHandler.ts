import { AxiosError } from 'axios';
import { redirect } from 'sveltekit-flash-message/server';
import type { Cookies } from '@sveltejs/kit';

export type ErrorType =
    | 'validation'
    | 'authentication'
    | 'authorization'
    | 'network'
    | 'rate_limit'
    | 'server'
    | 'api'
    | 'client'
    | 'unknown';

export interface ErrorDetails {
    message: string;
    type: ErrorType;
    fieldErrors?: Record<string, string | string[]> | null;
    statusCode?: number;
}

export function processError(error: unknown): ErrorDetails {
    if (error instanceof Response && error.status === 302) {
        return {
            message: 'Redirect',
            type: 'unknown',
            statusCode: 302,
        };
    }

    const errorDetails: ErrorDetails = {
        message: 'An unexpected error occurred',
        type: 'unknown',
        fieldErrors: null,
    };

    if (error instanceof AxiosError) {
        const responseData = error.response?.data;
        errorDetails.statusCode = error.response?.status;
        switch (error.response?.status) {
            case 400:
                errorDetails.message = 'Please check your input';
                errorDetails.type = 'validation';
                if (responseData?.errors && typeof responseData.errors === 'object') {
                    errorDetails.fieldErrors = responseData.errors;
                }
                break;
            case 401:
                errorDetails.message = responseData?.message ?? 'Invalid credentials';
                errorDetails.type = 'authentication';
                break;
            case 403:
                errorDetails.message = 'Access denied';
                errorDetails.type = 'authorization';
                break;
            case 429:
                errorDetails.message = 'Too many attempts, please try again later';
                errorDetails.type = 'rate_limit';
                break;
            case 500:
            case 502:
            case 503:
            case 504:
                errorDetails.message = 'Server error, please try again later';
                errorDetails.type = 'server';
                break;
            default:
                errorDetails.message =
                    responseData?.message ??
                    responseData?.error ??
                    `Error: ${error.response?.status ?? 'unknown'}`;
                errorDetails.type = 'api';
        }
        if (error.request && !error.response) {
            errorDetails.message = 'Network error: Unable to connect to server';
            errorDetails.type = 'network';
        }
    } else if (error instanceof Error) {
        errorDetails.message = error.message;
        errorDetails.type = 'client';
    }
    console.error('Error occurred:', {
        type: errorDetails.type,
        message: errorDetails.message,
        statusCode: errorDetails.statusCode,
        originalError: error,
    });
    return errorDetails;
}

export function handleRedirectError(
    url: URL,
    errorDetails: ErrorDetails,
    cookies: Cookies,
    redirectPath?: string,
): Response {
    return redirect(
        302,
        redirectPath ?? url.pathname,
        {
            type: 'error',
            message: errorDetails.message,
        },
        cookies,
    );
}

export function handleActionError(
    error: unknown,
    url: URL,
    cookies: Cookies,
    options: {
        redirectPath?: string;
    } = {},
): Response {
    if (error instanceof Response && error.status === 302) {
        return error;
    }
    const errorDetails = processError(error);
    return handleRedirectError(url, errorDetails, cookies, options.redirectPath);
}
