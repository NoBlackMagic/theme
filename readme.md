NoBlackMagic Theme
==================

> Responsive HTML theme for blogs and websites.

#### PROPERTIES

- **beautiful responsive**: smartphone / tablet / desktop optimized
- **hight configurable** responsive behaviors
- TwitterBoostrap available for stylish contents
- full editable **_LESS_ source**
- dropdown menu on smatphones
- floating sidebar on small tablets
- fixed sidebar on desktop

#### TODO:

- IE10+ check... may be 9+??

## First Install

As soon as you clone or download this package you need to use _NPM_ to solve required developement dependencies then run the default [_GruntJS_](http://gruntjs.com/) task to build it.

    npm install && grunt
    
> You need the lates [_NodeJS_](http://nodejs.org/) and [_NPM_](https://npmjs.org/) versions installed on your machine!
    
    
## Development Server

    node server.js
    
Then open a _web browser_ and point to:

    http://localhost:8080
    
   
## Deal With Sources

All theme sources are stored in `/src` folder. 

> Because this is just a theme you can run the `index.html` file and it should
> display the fully functional theme just after cloning or forking this repository

### LessCSS

All theme styles are build with [_LessCss_](http://lesscss.org/). The main _LESS_ source which drive all the others is `src/less/noblackmagic.less`.

When you start a _LESS_ working session you should activate an utility which compile the _LESS_ sources into a plain _CSS_ file which is already linked into `index.html`:

    grunt watch-less

> Now you can edit your _LESS_ source and see the results directly on the browser.


### 3rd party CSS

    <!--[CSS]-->
	<link rel="stylesheet" href="./css/noblackmagic.css" />
	... add other css here ...
	<!--[/CSS]-->
	
then list all 3rd party styles in `build.json`
    
    {
      "css": [
        "src/css/noblackmagic.css"
        "src/css/addon-style",
        ...
      ]
    }

### 3rd party Javascript

    <!--[JS]-->
    <script src="js/noblackmagic.js"></script>
    ... add other scripts here...
	<!--[/JS]-->
	
then list all 3rd party scripts in `build.json`
    
    {
      "js": [
        "src/js/noblackmagic.js",
        "src/js/library-01",
        ...
      ]
    }






## Build a Production Theme

_NoBlackMagic_ can be processed to optimize all required _CSS_ and _Javascript_ into 
concatenated and minified files. 

    // build the production sources
    grunt build

Then you can open the `/build` folder to enjoy the **theme ready to be used for production**.

- single minified _CSS_
- single minified _Javascript_
- strip all demo text

> **IMPORTANT:** all 3rd party _CSS_ and _Javascript_ must be listed 
> into `build.json` as described above!


