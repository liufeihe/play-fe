const path = require("path")

const getAssetsPath = (_path) => {
    return path.posix.join('/', _path)
}

module.exports =  {
    getAssetsPath
}

