let fs = require('fs')
let path = require('path')
let buffer = require('buffer')
let os = require('os')

function modify(search, replace, size) {
	let fileName = []
	let fileAll = fs.readdirSync(__dirname)
	let buf = Buffer.alloc(size)
	let buf1 = Buffer.from(search)
	let buf2 = Buffer.from(replace)
	let buf2Length = buf2.length
	let stat, path

	for (let i = 0; i < fileAll.length; i++) {
		if (os === 'Windows_NT') {
			stat = fs.lstatSync(`${__dirname}\\${fileAll[i]}`)
		} else {
			stat = fs.lstatSync(`${__dirname}\/${fileAll[i]}`)
		}

		if (stat.isDirectory()) {
			fileName.push(fileAll[i])
		}
	}

	for (let i = 0; i < fileName.length; i++) {

		if (os === 'Windows_NT') {
			path = `${__dirname}\\${fileName[i]}\\.git\\config`
		} else {
			path = `${__dirname}\/${fileName[i]}\/.git\/config`
		}

		fs.open(path, 'r+', (err, fd) => {
			fs.read(fd, buf, 0, 500, 0, (err, bytesRead, buffer) => {
				let position = buffer.indexOf(buf1)
				if (position != -1) {
					fs.write(fd, buf2, 0, buf2Length, position, (err, bytesRead, buffer) => {
						if (err) {
							throw err
						} else {
							console.log(`${fileName[i]}修改成功`)
						}
					})
				} else {
					console.log(`${fileName[i]}修改失败，没有找到内容`)
				}
			})
		})
	}

}


modify('feather150', 'Feather130', 500)