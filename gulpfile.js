const gulp = require("gulp");
const clean = require("gulp-clean");
const hash = require("string-hash");
const svgmin = require("gulp-svgmin");

const context = __dirname;

gulp.task("clean-output", () => {
  return gulp.src("./output", { read: false }).pipe(clean());
});

gulp.task("images", () => {
  return gulp
    .src("./input/**/*.svg")
    .pipe(
      svgmin((file) => {
        const prefix = hash(`${context}${file.relative}`);

        return {
          plugins: [
            {
              name: "cleanupIDs",
              params: {
                minify: true,
                prefix,
              },
            },
          ],
        };
      })
    )
    .pipe(gulp.dest("./output"));
});

exports.default = gulp.series("clean-output", "images");
