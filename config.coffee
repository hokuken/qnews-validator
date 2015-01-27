path    = require 'path'

root = __dirname;
src  = path.join(root, 'src')
dest = path.join(root, 'dist')

module.exports =

  dest: dest

  uglify:
    src: root + '/validation.js'
    out: 'validation.min.js'
    dest: dest

  copy:
    src: [root + '/validation.js', root + '/README.md']
    dest: dest

  watch:
    src: [root + '/validation.js', root + '/README.md']
