import type { HlsConfig } from 'hls.js';

/** Keep transient manifest failures from ending live playback after one retry. */
export const HLS_PLAYBACK_CONFIG: Partial<HlsConfig> = {
    manifestLoadingMaxRetry: 3,
    manifestLoadingRetryDelay: 1_000,
    manifestLoadingMaxRetryTimeout: 6_000,
};
