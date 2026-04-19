/**
 * @file version.ts
 * @description Version command - displays current package version and build info
 * @author node-cli-boilerplate contributors
 * @license MIT
 */

import { Command } from "commander";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface PackageJson {
	name: string;
	version: string;
	description: string;
	author: string | { name: string; email?: string; url?: string };
	license: string;
}


 * Reads and parses the package.json file
 * @returns Parsed package.json object
 */
const getPackageInfo = (): PackageJson => {
	const packagePath = join(__dirname, "../../package.json");
	const raw = readFileSync(packagePath, "utf-8");
	return JSON.parse(raw) as PackageJson;
};

/**
 * Formats the author field regardless of whether it's a string or object
 * @param author - Author field from package.json
 * @returns Formatted author string
 */
const formatAuthor = (author: PackageJson["author"]): string => {
	if (typeof author === "string") {
		return author;
	}
	if (typeof author === "object" && author !== null) {
		let result = author.name;
		if (author.email) result += ` <${author.email}>`;
		if (author.url) result += ` (${author.url})`;
		return result;
	}
	return "Unknown";
};

/**
 * Registers the version command on the given Commander program
 * @param program - Commander program instance
 */
export const registerVersionCommand = (program: Command): void => {
	program
		.command("version")
		.alias("v")
		.description("Display version and build information")
		.option("--json", "Output version info as JSON")
		.action((options: { json?: boolean }) => {
			try {
				const pkg = getPackageInfo();

				if (options.json) {
					console.log(
						JSON.stringify(
							{
								name: pkg.name,
								version: pkg.version,
								description: pkg.description,
								author: formatAuthor(pkg.author),
								license: pkg.license,
								node: process.version,
								platform: process.platform,
							},
							null,
							2,
						),
					);
				} else {
					console.log(`\n📦 ${pkg.name} v${pkg.version}`);
					console.log(`   ${pkg.description}`);
					console.log(`   Author  : ${formatAuthor(pkg.author)}`);
					console.log(`   License : ${pkg.license}`);
					console.log(`   Node.js : ${process.version}`);
					console.log(`   Platform: ${process.platform}\n`);
				}
			} catch (err) {
				console.error("Failed to read version information:", err);
				process.exit(1);
			}
		});
};
