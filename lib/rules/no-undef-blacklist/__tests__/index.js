const rule = require("..");
const { RuleTester } = require("eslint/lib/rule-tester");

const options = ["foo", "bar"];
const parserOptions = {
	ecmaVersion: 2022,
	sourceType: "module",
};
const ruleTester = new RuleTester();

ruleTester.run("no-undef-blacklist", rule, {
	valid: [
		{ code: "import foo from 'foo'; foo();", options, parserOptions },
		{ code: "import bar from 'bar'; bar();", options, parserOptions },
		{ code: "import xyz from 'xyz'; xyz();", options, parserOptions },
		{ code: "xyz();", options, parserOptions },
	],
	invalid: [
		{
			code: "foo();",
			options,
			parserOptions,
			errors: [{ messageId: "undef", data: { name: "foo" }, type: "Identifier" }],
		},
		{
			code: "bar();",
			options,
			parserOptions,
			errors: [{ messageId: "undef", data: { name: "bar" }, type: "Identifier" }],
		},
	],
});
