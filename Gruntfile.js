/**
 * NoBlackMagic - Theme
 */

var markdownTag = require('markdown-tag');

module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');
	var build = grunt.file.readJSON('build.json');
	
// ----------------------------------------------------- //
// ---[[   G R U N T   C O N F I G U R A T I O N   ]]--- //
// ----------------------------------------------------- //

	grunt.initConfig({

		pkg: pkg,
		
		clean: {
			less: [
				'src/css/noblackmagic.css',
				'src/css/noblackmagic.css.map'
			],
			build: [
				//'build/**/*',
				'src/css/noblackmagic.min.css',
				'src/css/noblackmagic.min.css.map'
			]
		},
		
		copy: {
			assets: {
				files: [
					{expand: true, cwd: 'src/images',src: ['**'], dest: 'build/assets/images'},
					{expand: true, cwd: 'src/fonts',src: ['**'], dest: 'build/assets/fonts'}
				]
			},
			html: {
				options: {
					process: parseIndexFile
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['index.html'],
					dest: 'build/'
				}]
			}
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
		
		uglify: {
			build: {
				files: {} // dynamically built from HTML
			}
		},
		
		cssmin: {
			build: {
				files: {} // dynamically built from HTML
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
	
	grunt.registerTask('build-less', ['clean:less', 'less']);
	
	grunt.registerTask('watch-less', ['build-less', 'watch:less']);
	
	grunt.registerTask('build', [
		'clean',
		'copy',
		'less',
		'uglify',
		'cssmin'
	]);
	
	grunt.registerTask('default', ['build-less']);
	
	
	
// ----------------------------- //
// ---[[   H E L P E R S   ]]--- //	
// ----------------------------- //
	
	function parseIndexFile(html) {

		// create cssmin config
		grunt.config.data.cssmin.build.files['build/assets/css/noblackmagic.min.css'] = html2CssPaths(html).map(function(relativePath) {
			return relativePath.replace('./', 'src/');
		});

		// create uglify config
		grunt.config.data.uglify.build.files['build/assets/js/noblackmagic.min.js'] = html2JsPaths(html).map(function(relativePath) {
			return relativePath.replace('./', 'src/');
		});
        
		html = html.replace(/<!--\[CSS\]-->[\s\S]*?<!--\[\/CSS\]-->/g, '<link rel="stylesheet" href="./assets/css/noblackmagic.min.css" />');
		html = html.replace(/<!--\[JS\]-->[\s\S]*?<!--\[\/JS\]-->/g, '<script src="./assets/js/noblackmagic.min.js"></script>');
		html = html.replace(/<!--\[DEMO\]-->[\s\S]*?<!--\[\/DEMO\]-->/g, build.demoText);
		html = html.replace(/PageTitle/g, build.pageTitle);
        html = markdownTag(html);
		return html;
	}

	/**
	 * extract all css paths from the given html block
	 */
    function html2CssPaths(html) {
		var paths = [];
        html.replace(/<link\s+rel="stylesheet"\s+href="([^"]*)"\s*\/>/g, function (match, href) {
			paths.push(href);
        });
        return paths;
    }

	/**
	 * extract all js paths from the given html block
	 */
	function html2JsPaths(html) {
		var paths = [];
		html.replace(/<script\s+src="([^"]*)"\s*><\/script>/g, function (match, href) {
			paths.push(href);
		});
		return paths;
	}
    
};
