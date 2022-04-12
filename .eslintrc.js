module.exports = {
	parserOptions: {
		ecmaVersion: 2022,
	},
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:eslint-plugin/recommended", "plugin:prettier/recommended"],
	plugins: ["eslint-plugin"],
	rules: {
		"eslint-plugin/meta-property-ordering": "error",
		"eslint-plugin/prefer-placeholders": "error",
		"eslint-plugin/test-case-property-ordering": "error",
		"eslint-plugin/test-case-shorthand-strings": "error",
	},
};
