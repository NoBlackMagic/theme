/**
 * Theme Vicenza
 */

var marked = require('marked');

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
				files: {
					'build/assets/js/noblackmagic.min.js': build.js
				}
			}
		},
		
		cssmin: {
			build: {
				files: {
					'build/assets/css/noblackmagic.min.css': build.css
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
		html = html.replace(/<!--\[CSS\]-->[\s\S]*?<!--\[\/CSS\]-->/g, '<link rel="stylesheet" href="./assets/css/noblackmagic.min.css" />');
		html = html.replace(/<!--\[JS\]-->[\s\S]*?<!--\[\/JS\]-->/g, '<script src="./assets/js/noblackmagic.min.js"></script>');
		html = html.replace(/<!--\[DEMO\]-->[\s\S]*?<!--\[\/DEMO\]-->/g, build.demoText);
		html = html.replace(/PageTitle/g, build.pageTitle);
        html = parseMarkdownArea(html);
		return html;
	}	
	
    function parseMarkdownArea(html) {
        var openTag = '<!--[Markdown]-->';
        var closeTag = '<!--[/Markdown]-->';
        
        var startIdx = html.indexOf(openTag);
        var safeWhile = 100;
        while (startIdx !== -1 && safeWhile > 0) {
            
            var endIdx = html.indexOf(closeTag, startIdx);
            if (endIdx === -1) {
                return html;
            }
            
            // find markdown and strip indentation tags
            var markdown = html.substring(startIdx + openTag.length, endIdx);
            markdown = markdown.replace(new RegExp(markdown.substring(markdown.lastIndexOf('\n')), 'g'), '\n');
            
            html = html.substring(0, startIdx) 
                 + marked(markdown) 
                 + html.substring(endIdx + closeTag.length);
            
            startIdx = html.indexOf(openTag);
            safeWhile--;
        }
        
		return html;
	}
    
};
