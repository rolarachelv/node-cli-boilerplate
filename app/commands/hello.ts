/**
 * Hello command
 * @description Example command that greets the user
 */

import { Command } from "commander";

/**
 * Register the hello command on the given program
 * @param program - Commander program instance
 */
export const registerHelloCommand = (program: Command): void => {
	program
		.command("hello")
		.description("Greet a user by name")
		.argument("[name]", "Name of the person to greet", "World")
		.option("-u, --uppercase", "Print greeting in uppercase", false)
		.option("-r, --repeat <times>", "Number of times to repeat the greeting", "1")
		.action((name: string, options: { uppercase: boolean; repeat: string }) => {
			const times = Math.max(1, parseInt(options.repeat, 10) || 1);
			let greeting = `Hello, ${name}!`;

			if (options.uppercase) {
				greeting = greeting.toUpperCase();
			}

			for (let i = 0; i < times; i++) {
				console.log(greeting);
			}
		});
};
