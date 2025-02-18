// Autogenerated C header file for Arcade sound
#ifndef _JACDAC_SPEC_ARCADE_SOUND_H
#define _JACDAC_SPEC_ARCADE_SOUND_H 1

#define JD_SERVICE_CLASS_ARCADE_SOUND  0x1fc63606

/**
 * Argument: samples bytes. Play samples, which are single channel, signed 16-bit little endian values.
 */
#define JD_ARCADE_SOUND_CMD_PLAY 0x80

/**
 * Read-write Hz u22.10 (uint32_t). Get or set playback sample rate (in samples per second).
 * If you set it, read it back, as the value may be rounded up or down.
 */
#define JD_ARCADE_SOUND_REG_SAMPLE_RATE 0x80

/**
 * Constant B uint32_t. The size of the internal audio buffer.
 */
#define JD_ARCADE_SOUND_REG_BUFFER_SIZE 0x180

/**
 * Read-only B uint32_t. How much data is still left in the buffer to play.
 * Clients should not send more data than `buffer_size - buffer_pending`,
 * but can keep the `buffer_pending` as low as they want to ensure low latency
 * of audio playback.
 */
#define JD_ARCADE_SOUND_REG_BUFFER_PENDING 0x181

#endif
