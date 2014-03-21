# node-webkit-app

It's a demo app for [node-webkit](https://github.com/rogerwang/node-webkit) built with grunt.js.

# Build & run

This demo app use the following:

- [Jade](http://jade-lang.com/) for templates
- [Stylus](http://learnboost.github.io/stylus/) for styles
- [Grunt](http://gruntjs.com/) to build everything

Run `npm install` to retrieve npm dependencies.

Build with `grunt`.

Grunt executes the following tasks:

- [copy](https://github.com/gruntjs/grunt-contrib-copy) elements from `app/assets` to `dist`
- [stylus](https://github.com/gruntjs/grunt-contrib-stylus) to compile the css from `app/css/` to `dist/my-app.css`
- [cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) to minify the css from `dist/my-app.css` to `dist/my-app.min.css`
- [jade](https://github.com/gruntjs/grunt-contrib-jade) to compile the templates from `app/index.jade` to `dist/index.html`
- [jshint](https://github.com/gruntjs/grunt-contrib-jshint) to validate javascript code
- [concat](https://github.com/gruntjs/grunt-contrib-concat) to join javascript files from `app/js` to `dist/my-app.js`
- [uglisfy](https://github.com/gruntjs/grunt-contrib-uglify) to minify the javascript from `dist/my-app.js` to `dist/my-app.min.js`
- [node-webkit-builder](https://github.com/mllrsohn/grunt-node-webkit-builder) to create our application package.

[node-webkit-builder](https://github.com/mllrsohn/grunt-node-webkit-builder) will download a node-webkit package for the defined target platforms (see Gruntfile.js for details).

The final app will be built as an executable in the folder `dist-pkg/releases/my-app/<platform-name>/my-app/` .

# Remark

If your app doesn't know the libs (nedb, ftp), run `npm install` under the `dist` folder.

# Demos

The demo app shows some stuff:

- A "pages" demo, showing that navigation between pages works
- A "node" demo, using node modules to list the content of the current directory.
- A "database" demo, showing how we can save/load stuff from a database using [NeDB](https://github.com/louischatriot/nedb/)
- A "ftp" demo, allowing to send files to a ftp.
- More to come !

# License

This is licensed under the MIT license.