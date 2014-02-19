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
			debug: ['build/debug/**/*'],
			release: ['build/release/**/*'],
			jsmap: ['noblackmagic.map.js']
		},
		
		copy: {
			'assets-debug': {
				files: [
					{expand: true, cwd: 'src/images',src: ['**'], dest: 'build/debug/assets/images'},
					{expand: true, cwd: 'src/fonts',src: ['**'], dest: 'build/debug/assets/fonts'}
				]
			},
			'assets-release': {
				files: [
					{expand: true, cwd: 'src/images',src: ['**'], dest: 'build/release/assets/images'},
					{expand: true, cwd: 'src/fonts',src: ['**'], dest: 'build/release/assets/fonts'}
				]
			},
			'html-debug': {
				options: {
					process: parseIndexFileDebug
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['index.html'],
					dest: 'build/debug/'
				}]
			},
			'html-release': {
				options: {
					process: parseIndexFileRelease
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['index.html'],
					dest: 'build/release/'
				}]
			},
			jsmap: {
				files: [{
					src: 'noblackmagic.map.js',
					dest: 'build/debug/assets/js/noblackmagic.map.js'
				}]
			}
		},
		
		less: {
			options: {
				sourceMap: true,
				sourceMapFilename: 'build/debug/assets/css/noblackmagic.css.map',
				sourceMapBasepath: 'build/debug/assets/css'
			},
			debug: {
				files: {
					'build/debug/assets/css/noblackmagic.css' : ['src/less/noblackmagic.less']
				}
			}
		},
		
		uglify: {
			debug: {
				options: {
					compress: false,
					mangle: false,
					beautify: true,
					sourceMap: 'noblackmagic.map.js'
				},
				files: {} // dynamically built from HTML
			},
			release: {
				files: {
					'build/release/assets/js/noblackmagic.min.js' : ['build/debug/assets/js/noblackmagic.js']
				}
			}
		},
		
		cssmin: {
			release: {
				files: {} // dynamically built from HTML
			}
		},
		
		watch: {
			'build': {
				files: 'src/**/*',
				tasks: ['build']
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

	grunt.registerTask('build', [
		'clean:debug',
		'copy:assets-debug',
		'less:debug',
		'copy:html-debug',
		'uglify:debug',
		'copy:jsmap',
		'clean:jsmap'
	]);

	grunt.registerTask('release', [
		'clean:release',
		'build',
		'copy:assets-release',
		'copy:html-release',
		'cssmin:release',
		'uglify:release'
	]);

	grunt.registerTask('develop', [
		'build',
		'watch:build'
	]);

	grunt.registerTask('default', [
		'build'
	]);
	
	
// ----------------------------- //
// ---[[   H E L P E R S   ]]--- //	
// ----------------------------- //
	
	function parseIndexFileDebug(html) {

		// create uglify config
		grunt.config.data.uglify.debug.files['build/debug/assets/js/noblackmagic.js'] = html2JsPaths(html).map(function(relativePath) {
			return relativePath.replace('./', 'src/');
		});

		html = html.replace(/<!--\[JS\]-->[\s\S]*?<!--\[\/JS\]-->/g, '<script src="./assets/js/noblackmagic.js"></script>');

		html = html.replace(/\.\/css/g, './assets/css');

		html = markdownTag(html);
        html = markdownTag(html, '<!--[Markdown]-->', '<!--[/Markdown]-->');

		return html;
	}

	function parseIndexFileRelease(html) {

		// create cssmin config
		grunt.config.data.cssmin.release.files['build/release/assets/css/noblackmagic.min.css'] = html2CssPaths(html).map(function(relativePath) {
			return relativePath.replace('./', 'build/debug/assets/');
		});

		html = html.replace(/<!--\[CSS\]-->[\s\S]*?<!--\[\/CSS\]-->/g, '<link rel="stylesheet" href="./assets/css/noblackmagic.min.css" />');
		html = html.replace(/<!--\[JS\]-->[\s\S]*?<!--\[\/JS\]-->/g, '<script src="./assets/js/noblackmagic.min.js"></script>');

		html = html.replace(/<!--\[DEMO\]-->[\s\S]*?<!--\[\/DEMO\]-->/g, build.demoText);
		html = html.replace(/PageTitle/g, build.pageTitle);

		html = markdownTag(html);
		html = markdownTag(html, '<!--[Markdown]-->', '<!--[/Markdown]-->');

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
