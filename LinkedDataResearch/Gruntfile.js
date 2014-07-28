'use strict';

/* jshint -W106 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
      	'Client/index.js',
        'Client/**/*.js',
        '!.#*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // browserify everything
    browserify: {
      // build the tests
      tests: {
        src: [ 'ClientTest/test.js' ],
        dest: 'ClientTest/browserified_tests.js',
        options: {
          bundleOptions : {
          	debug : true
          }
        }
      },

      build: {
        src : ['Client/entry.js'],
        dest : 'Public/Scripts/build.js'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['test']
    },

    // run the mocha tests in the browser via PhantomJS
    'mocha_phantomjs': {
      all: ['ClientTest/testrunner.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('test', ['jshint', 'browserify','mocha_phantomjs']);
  grunt.registerTask('build', ['jshint', 'browserify:build','browserify:tests', 'mocha_phantomjs']);
}
