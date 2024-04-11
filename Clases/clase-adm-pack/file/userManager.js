const fs = require('node:fs')

const path = './file/Usuarios.json'

class UserManager {
    constructor(path){
            this.path = path
    }
    readFile = async() => {
        try {
            const dataJson = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(dataJson)
        } catch (error) {
            return []
        }
    }
}