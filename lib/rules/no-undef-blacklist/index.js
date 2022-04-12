/**
 * @fileoverview Rule to flag references to undeclared variables.
 * @copyright 2019 Appulate
 * @copyright JS Foundation and other contributors, https://js.foundation
 */

/**
 * This rule is a fork of https://eslint.org/docs/rules/no-undef that adds an ability to specify a blacklist of identifiers.
 * Ideally, we wouldn't need this rule, because we could rely on TypeScript. But some typings, such as @types/jquery
 * or @types/knockout declare global variables (i.e. $) and TypeScript does not throw any errors when such a global
 * variable is used in the module without its import. The original no-undef rule works incorrectly in TypeScript files
 * because of the error https://github.com/typescript-eslint/typescript-eslint/issues/342, so we had to write our own
 * rule that accepts the list of certain problematic identifiers.
 */

"use strict";

module.exports = {
	meta: {
		type: "problem",
		docs: {
			description: "disallow the use of undeclared variables unless mentioned in `/*global */` comments",
			category: "Variables",
		},
		schema: {
			type: "array",
			items: {
				type: "string",
			},
			uniqueItems: true,
			minItems: 1,
		},
		messages: {
			undef: "'{{name}}' is not defined.",
		},
	},

	create(context) {
		const blacklist = context.options;

		return {
			"Program:exit"() {
				const globalScope = context.getScope();

				globalScope.through.forEach((ref) => {
					const { identifier } = ref;

					if (blacklist.includes(identifier.name)) {
						context.report({
							node: identifier,
							messageId: "undef",
							data: identifier,
						});
					}
				});
			},
		};
	},
};
