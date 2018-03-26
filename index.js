let fs = require('fs')
let path = require('path')
let buffer = require('buffer')
let fileName = []
let fileAll = fs.readdirSync(__dirname)
let buf = Buffer.alloc(500)
let buf1 = Buffer.from('Feather')
let buf2 = Buffer.from('feather150')
for (let i = 0; i < fileAll.length; i++) {
    let stat = fs.lstatSync(`${__dirname}\/${fileAll[i]}`)
    if (stat.isDirectory()) {
        fileName.push(fileAll[i])
    }
}
for (let i = 0; i < fileName.length; i++) {
    fs.open(`${__dirname}\/${fileName[i]}\/.git\/config`, 'r+', (err, fd) => {
        fs.read(fd, buf, 0, 500, 0, (err, bytesRead, buffer) => {
            let position = buffer.indexOf(buf1)
            fs.write(fd, buf2, 0, 10, position, (err, bytesRead, buffer) => {
                if (err) {
                    throw err
                } else {
                    console.log('修改成功')
                }
            })
        })
    })
}