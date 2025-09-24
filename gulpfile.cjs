const { series } = require('gulp')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

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

function compressDist(cb) {
	const command = 'cd dist && 7z a ../dist.7z * -r'
	exec(command, (err, stdout, stderr) => {
		if (err) {
			console.error(`Error during compression: ${err.message}`)
			console.error(`stderr: ${stderr}`)
			cb(err)
			return
		}
		console.log(`stdout: ${stdout}`)
		cb()
	})
}

exports.default = series(createRedirectsFile, compressDist)
