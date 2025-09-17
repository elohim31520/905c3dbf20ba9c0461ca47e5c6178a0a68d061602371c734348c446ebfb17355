const { series } = require('gulp')
const fs = require('fs')
const path = require('path')

function createRedirectsFile(cb) {
	const distDir = 'dist'
	const redirectsFilePath = path.join(distDir, '_redirects')
	const redirectsContent = '/* /index.html 200'

	// Ensure the 'dist' directory exists.
	if (!fs.existsSync(distDir)) {
		fs.mkdirSync(distDir, { recursive: true })
	}

	fs.writeFile(redirectsFilePath, redirectsContent, cb)
}

exports.default = series(createRedirectsFile)
