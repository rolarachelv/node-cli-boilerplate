/**
 * @file app/index.ts
 * @description Main entry point for the node-cli-boilerplate application.
 * Handles CLI argument parsing and bootstraps the application.
 * @author node-cli-boilerplate contributors
 * @license MIT
 */

import { Command } from "commander";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Reads the package.json to extract version and description
 */
const packageJson = JSON.parse(
	readFileSync(resolve(__dirname, "../package.json"), "utf-8")
);

/**
 * Initializes and configures the CLI program.
 * @returns {Command} Configured Commander instance
 */
function createProgram(): Command {
	const program = new Command();

	program
		.name(packageJson.name ?? "node-cli-boilerplate")
		.description(packageJson.description ?? "A Node.js CLI boilerplate")
		.version(packageJson.version ?? "1.0.0", "-v, --version", "Output the current version");

	// Example: a default 'run' command
	program
		.command("run")
		.description("Run the main application logic")
		.option("-d, --debug", "Enable debug output", false)
		// Changed default config path to match my personal project structure
		.option("-c, --config <path>", "Path to a custom config file", "config/.env")
		.action(async (options: { debug: boolean; config: string }) => {
			try {
				await run(options);
			} catch (error) {
				console.error("[ERROR] Unexpected failure:", error);
				process.exit(1);
			}
		});

	return program;
}

/**
 * Core application logic executed when the 'run' command is invoked.
 * @param options - CLI options passed by the user
 */
async function run(options: { debug: boolean; config: string }): Promise<void> {
	if (options.debug) {
		console.debug("[DEBUG] Debug mode enabled");
		console.debug("[DEBUG] Config path:", options.config);
	}

	console.log(`Starting ${packageJson.name} v${packageJson.version}...`);

	// TODO: Replace with your application logic
	console.log("Hello from node-cli-boilerplate! 🚀");
}

/**
 * Application bootstrap — parses process arguments and starts the CLI.
 */
(async () => {
	const program = createProgram();
	await program.parseAsync(process.argv);
})();
