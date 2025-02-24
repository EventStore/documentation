import { logger } from "vuepress/utils";

// Check for the "--verbose" flag in process arguments. // The goal uses the double-slash param (-- --verbose) as VuePress's CLI - CAC doesn't allow extraneous flags.
const isVerbose = process.argv.includes("--verbose");

/**
 * Logs a single message if verbose logging is enabled.
 *
 * @param message - The message to log.
 */
export function logInfo(message: string): void {
  if (isVerbose) {
    logger.info(message);
  }
}

/**
 * Logs an array of messages in one go, joining them into a single IO call.
 *
 * @param messages - An array of messages to log.
 */
export function logBatch(messages: string[]): void {
  if (isVerbose && messages.length > 0) {
    // Join messages with newlines to log them as one block.
    logger.info(messages.join("\n"));
  }
}
