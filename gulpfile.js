/**
 * 自带的方法
 * 
 * gulp.src() 获取任务要处理的文件
 * gulp.dest() 输出文件
 * gulp.task() 建立gulp任务
 * gulp.watch() 监听文件的变化
 * 
 * 命令行操作
 *  gulp 指令
 * Gulp 插件
 *  gulp-htmlmin html文件压缩
 *  gulp-csso 压缩css
 *  gulp-babel JavaScript语法转化
 *  gulp-less less语法转化
 *  gulp-uglify 压缩混淆JavaScript
 *  gulp-file-include 公共文件包含html
 *  browsersync 浏览器实时同步
 * 
 */
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');


// 项目构建
gulp.task('build',async () => {
  // less
  gulp.src('./gulp/src/css/*.less')
    // 将less 语法转化为 css 语法 
    .pipe(less())
    .pipe(gulp.dest('./build/css'))

  // html
  gulp.src('./gulp/src/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('build')) 
    
  // copy img
  gulp.src('./gulp/src/img/*')
  .pipe(gulp.dest('build/img')) 

  gulp.src('./gulp/src/js/**/*')
  .pipe(gulp.dest('build/js'))
  // copy font
  gulp.src('./gulp/src/font/*')
  .pipe(gulp.dest('build/font'))  

});







































// 使用gulp.task() 方法建立任务
// 1.任务的名称
// 2.任务的回调函数
gulp.task('css',() => {
  // 获取要处理的文档
  gulp.src('./gulp/src/css/*.css')
    .pipe(gulp.dest('./build/css'))
});

// html 任务 npm install gulp-htmlmin 
// 1.html 文件代码的压缩操作
// 2.抽取html文件中的公共代码抽象
gulp.task('htmlmin',()=>{
  gulp.src('./gulp/src/*.html')
      .pipe(fileinclude())
      // 压缩html 代码
      // .pipe(htmlmin({collapseWhitespace:true})) 
      .pipe(gulp.dest('build'))
})

// css任务 npm install gulp-less css 转 less / npm install gulp-csso 
// 1.less 语法转换
// 2.css 代码压缩
gulp.task('cssmin',()=>{
  gulp.src('./src/css/*.less')
      // 将less 语法转化为 css 语法 
      .pipe(less())
      // 将css代码进行压缩
      .pipe(csso())
      // 将处理的结构放在在 dist
      .pipe(gulp.dest('dist'))
})



// 拷贝任务
gulp.task('copy',()=>{
  gulp.src('./src/images/*')
      .pipe(gulp.dest('bulid/images'))
})



/**
 * 命令行中使用
 *  gulp [taskname]
 *  
 */


/**
 * 
 * collapseWhitespace 折叠 空格
 * task 任务
 * dest 属于
 * common 公共代码
 * 
 * 
 * 
 */