// through2 是一个对 node 的 transform streams 简单封装
var through = require('through2');
var gm = require('gm');
var path = require('path');

// 插件级别函数 (处理文件)
function gulpPrefixer(destdir) {
  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function(file, enc, cb) {
    try {
      gm(file.path)
          .size(function(err, value) {
              var dest_dir = path.normalize(path.dirname(file.path) + "\\" + destdir);
              var filename = path.basename(file.path);
              this.thumb(value.width / 2, value.height / 2, dest_dir + "\\" + filename, 100, function(ee, ee2) {
                  cb(null, file);
              });
          });
  } catch (ex) {
      console.error("请确定已经安装了GraphicsMagick，并将其添加到了path里面");
  }
    
  });
};

// 暴露（export）插件主函数
module.exports = gulpPrefixer;
