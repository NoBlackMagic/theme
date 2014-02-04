/**
 * Theme Vicenza
 */

module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');
	
// ----------------------------------------------------- //
// ---[[   G R U N T   C O N F I G U R A T I O N   ]]--- //
// ----------------------------------------------------- //

	grunt.initConfig({

		pkg: pkg,
		
		clean: {
			less: [
				'src/css/noblackmagic.css',
				'src/css/noblackmagic.css.map'
			]
		},
		
		less: {
			options: {
				sourceMap: true,
				sourceMapFilename: 'src/css/noblackmagic.css.map',
				sourceMapBasepath: 'src/css'
			},
			dev: {
				files: {
					'src/css/noblackmagic.css' : ['src/less/noblackmagic.less']
				}
			}
		},
		
		watch: {
			less: {
				files: 'src/less/**/*',
				tasks: ['build-less']
			}
		}
		
	});


// ---------------------------------------------------//
// ---[[   L O A D   L I B R A R Y   T A S K S   ]]--- //
// ---------------------------------------------------//
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');



// --------------------------------------------- //
// ---[[   A V A I L A B L E   T A S K S   ]]--- //
// --------------------------------------------- //
	
	grunt.registerTask('build-less', ['clean:less', 'less:dev']);
	
	grunt.registerTask('watch-less', ['build-less', 'watch:less']);
	
	grunt.registerTask('default', ['build-less']);
	
// ----------------------------- //
// ---[[   H E L P E R S   ]]--- //	
// ----------------------------- //

		
	
};
