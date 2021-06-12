// credits to noblox.js

const path = require('path')
const fs = require('fs')
const include = ['cache']

const rbxapi = {}

function search (dir) {
  require('fs').readdirSync(dir).forEach(function (file) {
    const stat = fs.statSync(path.join(dir, file))
    if (stat.isFile() || include.indexOf(file) !== -1) {
      rbxapi[file.replace('.js', '')] = require(dir + '/' + file)
    } else if (stat.isDirectory()) {
      search(path.join(dir, file))
    }
  })
}

search(__dirname + "/lib")

for (const name in rbxapi) {
  const exporter = rbxapi[name]
  if (Object.prototype.hasOwnProperty.call(exporter, 'func')) {
    module.exports[name] = rbxapi.wrap.wrapExport(exporter.func, exporter.required || [], exporter.optional || [])
  } else {
    module.exports[name] = rbxapi[name]
  }
}