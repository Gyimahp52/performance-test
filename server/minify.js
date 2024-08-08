const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');
const { minify } = require('html-minifier');

const cssFiles = [
    { src: 'public/css/styles.css', dest: 'public/css/lazy-styles.min.css' },
    { src: 'public/css/styles.css', dest: 'public/css/minified-styles.min.css' },
    { src: 'public/css/styles.css', dest: 'public/css/combined-styles.min.css' }
];

const jsFiles = [
    { src: 'public/js/script.js', dest: 'public/js/minified-script.min.js' },
    { src: 'public/js/lazy-script.js', dest: 'public/js/combined-script.min.js' }
];

const htmlFiles = [
    { src: 'public/baseline.html', dest: 'public/baseline.html' },
    { src: 'public/lazy.html', dest: 'public/lazy.html' },
    { src: 'public/minified.html', dest: 'public/minified.html' },
    { src: 'public/combined.html', dest: 'public/combined.html' }
];

// Minify CSS
cssFiles.forEach(file => {
    const input = fs.readFileSync(file.src, 'utf8');
    const output = new CleanCSS().minify(input);
    if (output.errors.length) {
        console.error(`Error minifying ${file.src}:`, output.errors);
    } else {
        fs.writeFileSync(file.dest, output.styles, 'utf8');
    }
});

// Minify JS
jsFiles.forEach(file => {
    const input = fs.readFileSync(file.src, 'utf8');
    const result = UglifyJS.minify(input);
    if (result.error) {
        console.error(`Error minifying ${file.src}:`, result.error);
    } else {
        fs.writeFileSync(file.dest, result.code, 'utf8');
    }
});

// Minify HTML
htmlFiles.forEach(file => {
    const input = fs.readFileSync(file.src, 'utf8');
    const output = minify(input, {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
    });
    fs.writeFileSync(file.dest, output, 'utf8');
});

console.log('Minification complete.');
