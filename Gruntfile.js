module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [
          'core/fix-ie.js',
          'core/log.js',
          'core/core.js',
          'modules/**/*.js'
        ],
        dest: '<%= pkg.name %>.min.js'
      }
    },

    injector: {
      options: {},
      dev: {
        files: {
          'index.html': [
            'core/fix-ie.js',
            'core/log.js',
            'core/core.js',
            'modules/**/*.js'
          ],
        },
        options: {
          addRootSlash: false
        }
      },
      dist: {
        files: {
          'index.html': [
            '<%= pkg.main %>'
          ],
        },
        options: {
          addRootSlash: false
        }
      }
    },

    watch: {
      html: {
        files: [ '**/*.html' ]
      },
      js: {
        files: [ 'core/**/*.js', 'modules/**/*.js' ],
        tasks: ['dev-build']
      },
      options: {
        livereload: 33444
      }
    },

    fileserver: {
      dev: {
        options: {
          port: 8080,
          hostname: '0.0.0.0',
          root: '.',
          openInBrowser: true
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'modules/**/*.js']
    }

  });

  // Dev Build
  grunt.registerTask('dev-build', ['injector:dev', 'uglify']);

  // Dev Build and Watch
  grunt.registerTask('dev', ['dev-build', 'fileserver', 'watch']);

  // Dev Build and Watch
  grunt.registerTask('dist', ['uglify', 'injector:dist', 'fileserver', 'watch']);

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};