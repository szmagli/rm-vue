module.exports = {
	plugins: [
		require('autoprefixer')
	],
	autoprefixer: { browsers: ['last 20 versions', 'iOS >= 8', 'Safari >= 8', 'ie >= 9'] }
};