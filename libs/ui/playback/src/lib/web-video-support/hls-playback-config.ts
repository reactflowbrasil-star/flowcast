import type { HlsConfig } from 'hls.js';

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
