const fs = require('fs')
const path = require('path')
const buffer = require('buffer')

function readdirs(file) {
    let stat
    let fliePath = []
    let pathList = function fn(file, fliePath) {
        let files = fs.readdirSync(file)
        for (let i = 0; i < files.length; i++) {
            stat = fs.lstatSync(path.join(file, files[i]))
            if (stat.isDirectory()) {
                if (files[i] === '.git') {
                    let temp = path.join(file, files[i], 'config')
                    fliePath.push(temp)
                }
                fn(path.join(file, files[i]), fliePath)
            }
        }
        return fliePath
    }
    return pathList(file, fliePath)
}

function modify(size, search, replace) {
    let paths = readdirs(__dirname)
    for (let i = 0; i < paths.length; i++) {
        let buf = Buffer.alloc(size)
        let buf1 = Buffer.from(search)
        fs.open(paths[i], 'r+', (err, fd) => {
            fs.read(fd, buf, 0, size, 0, (err, bytesRead, buffer) => {
                let position = buffer.indexOf(buf1)
                if (position > -1) {
                    let text = buffer.toString('utf8')
                    let textLen = text.slice(0, bytesRead)
                    let replaceText = textLen.replace(search, replace)
                    let buf2 = Buffer.from(replaceText)
                    let buf2Length = buf2.length
                    fs.write(fd, buf2, 0, buf2Length, 0, (err, bytesRead, buffer) => {
                        if (err) throw err
                        console.log(`${paths[i]} 修改成功`)
                    })
                } else {
                    console.log(`${paths[i]}没有找到对应内容,修改失败`)
                }
            })
        })
    }
}

modify(parseInt(process.argv[2]), process.argv[3], process.argv[4])

/*function readdirs(){
	let stat
	let fliePath = []
	let temp = arr;
	let files = fs.readdirSync(file)
	for (let i = 0; i < files.length; i++) {
		stat = fs.lstatSync(`${file}\\${files[i]}`)
		if (stat.isDirectory()) {
			if (files[i] === '.git') {
				let fliePath = `${file}\\${files[i]}\\config`
				arr.push(fliePath)
				temp[i] = (fliePath)
			}
			arguments.callee(`${file}\\${files[i]}`, arr)
		}
	}
	return arr
}*/

/*function readdirs(){
	return new Promise((resolve, reject) => {
		fs.readdir(file, (err, files) => {
			let stat
			let fliePath = []
			for (let i = 0; i < files.length; i++) {
				stat = fs.lstatSync(`${file}\\${files[i]}`)
				if (stat.isDirectory()) {
					if (files[i] === '.git') {
						fliePath.push(`${file}\\${files[i]}\\config`)
					}
					readdirs(`${file}\\${files[i]}`)
				}
			}
			console.log(fliePath)
			resolve(fliePath)
		})
	})
}*/


/* const zoom1 = fs.readdirSync(__dirname)


function directory(zoom) {

    let stat
    const fileName = []
    for (let i = 0; i < zoom.length; i++) {
        if (os === 'Windows_NT') {
            stat = fs.lstatSync(`$ { __dirname }\\$ { zoom[i] }`)
        } else {
            stat = fs.lstatSync(`$ { __dirname }\/${zoom[i]}`)//         }

        if (stat.isDirectory()) {
            fileName.push(zoom[i])
        }
    }
    return fileName
}
directory(zoom1) */


/* function modify(search, replace, size) {
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
            fs.read(fd, buf, 0, size, 0, (err, bytesRead, buffer) => {
                let position = buffer.indexOf(buf1)
                if (position >= 0) {
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


modify('feather150', 'Feather130', 500) */