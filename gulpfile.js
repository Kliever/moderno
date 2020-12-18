let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function(){
  del.sync ('dist')
})

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    // 'node_modules/slick-carousel/slick/slick.css'
    // 'node_modules/animate.css/animate.css'
    // 'node_modules/magnific-popup/dist/magnific-popup.css'
    // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css'
    // 'node_modules/fullpage.js/dist/fullpage.css'
    // 'node_modules/webui-popover/dist/jquery.webui-popover.css'
    // 'node_modules/pagepiling.js/dist/jquery.pagepiling.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function(){
  return gulp.src('app/**/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/mixitup/dist/mixitup.js' // слик слайдер
    // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js' // всплывающее окно, попап картинок (увеличение картинки при клике)
    // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js'  // предпочтительно попап картинок, видео и прочего (увеличение картинки при клике)
    // 'node_modules/wow.js/dist/wow.js'  // анимация элементов сайта при скролле(в паре с animate.css)
    // 'node_modules/waypoints/lib/jquery.waypoints.js' // действия на контрольных точках
    // 'node_modules/jquery.spincrement.js' // устанавливается файлом, счетчик чисел, работает сам или в паре с waypoints.js
    // 'node_modules/fullpage.js/dist/fullpage.js'  //Постраничный скроллинг
    // 'node_modules/jquery.nicescroll/dist/jquery.nicescroll.js'  //Кастомизация полосы прокрутки и характеристик самой прокрутки
    // 'node_modules/webui-popover/dist/jquery.webui-popover.js'  //Всплывающие подсказки
    // 'node_modules/aos/dist/aos.js'  //Анимация при скролле
    // 'node_modules/pagepiling.js/dist/jquery.pagepiling.js'  //Постраничный скроллинг с множеством функций
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('export', function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
  
  let buildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let buildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));

  let buildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

    let buildImages = gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/**/*.html', gulp.parallel('html'));
  gulp.watch('app/js/**/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'))