import {
    ErrorDetails,
    ErrorTypes,
    type ErrorData,
    type HlsConfig,
} from 'hls.js';

/**
 * Favor stable playback on variable provider/mobile connections: keep a modest
 * forward buffer and leave bandwidth headroom before selecting higher levels.
 */
export const HLS_PLAYBACK_CONFIG: Partial<HlsConfig> = {
    manifestLoadingMaxRetry: 3,
    manifestLoadingRetryDelay: 1_000,
    manifestLoadingMaxRetryTimeout: 6_000,
    maxBufferLength: 45,
    maxBufferSize: 48 * 1_000 * 1_000,
    abrBandWidthFactor: 0.8,
    abrBandWidthUpFactor: 0.6,
};

/**
 * A native HLS media request can succeed where HLS.js manifest XHR is blocked
 * by provider CORS rules. Only try it for an initial fatal manifest network
 * error with no HTTP response, and only when the browser advertises support.
 */
export function shouldFallbackToNativeHls(
    video: HTMLVideoElement,
    error: ErrorData
): boolean {
    return (
        error.fatal === true &&
        error.type === ErrorTypes.NETWORK_ERROR &&
        error.details === ErrorDetails.MANIFEST_LOAD_ERROR &&
        (error.response?.code === undefined || error.response.code === 0) &&
        video.canPlayType('application/vnd.apple.mpegurl') !== ''
    );
}
