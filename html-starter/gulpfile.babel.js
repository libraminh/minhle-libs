"use strict";
import gulp from "gulp";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import sass from "gulp-sass";
import prefixer from "gulp-autoprefixer";

import pug from "gulp-pug";

import sourcemaps from "gulp-sourcemaps";
import browserSync from "browser-sync";

browserSync.create();
const root = "node_modules";

// Config for build destination
let build_html_destination = "dist"
let build_assets_destination = `${build_html_destination}/assets`

// Declare gulp task
gulp.task("copyHtml", function() {
  return gulp.src("src/*.html").pipe(gulp.dest(build_html_destination));
});

gulp.task("vendor", () => {
  gulp
    .src([
      
      root + "/jquery/dist/jquery.min.js",
      
      
      root + "/bootstrap/dist/js/bootstrap.min.js",
      
      
      "src/assets/vendor/**/*"
    ])
    .pipe(gulp.dest(`${build_assets_destination}/vendor`))
})


gulp.task("fonts", function() {
  gulp
    .src([root + "/font-awesome/fonts/fontawesome-webfont.*"])
    .pipe(gulp.dest(`${build_assets_destination}/fonts`));
  gulp
    .src([root + "/font-awesome/css/font-awesome.min.css"])
    .pipe(gulp.dest(`${build_assets_destination}/vendor`));
});



gulp.task("pug", () => {
  return gulp
    .src("src/*.pug")
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(build_html_destination));
});


gulp.task("image", function() {
  return gulp
    .src("src/assets/images/**/*")
    .pipe(gulp.dest(`${build_assets_destination}/images`));
});

gulp.task("sass", () => {
  return gulp
    .src(["src/assets/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(
      prefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${build_assets_destination}/css`))
    .pipe(browserSync.stream());
});

gulp.task("script", () => {
  return (
    gulp
      .src("src/assets/js/**/*.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`${build_assets_destination}/js`))
      .pipe(browserSync.stream())
  );
});

const tasks = ['copyHtml', 'sass', 'pug', 'vendor', 'fonts', 'script', 'image']

gulp.task("serve", tasks, () => {
  browserSync.init({
    server: "./dist",
    port: 6900
  });

  gulp.watch(
    [root + "/bootstrap/scss/bootstrap.scss", "src/assets/css/**/*.scss"],
    ["sass"]
  );
  
  gulp.watch("src/**/*.pug", ["pug"]).on("change", browserSync.reload);
  
  
  gulp.watch("src/assets/js/*.js", ["script"]);
  gulp.watch("src/assets/images/**/*", ["image"]);
  gulp.watch("src/assets/vendor/**/*", ["vendor"]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("default", [
  "copyHtml",
  "sass",
  "script",
  
  "fonts",
  
  "vendor",
  
  "pug",
  
  "image"
]);
