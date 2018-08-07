UWF_KarmaJasmineTemplate
==============================

JS Unit Testing Template | Karma & Jasmine

1- Build project

//Run Unit Test on console
2- karma start

//Generate Unit Test reports [Report path will be as follows: \tests.report\units.html]
3- karma start --reporters html

//Set the reference of js files in karma.config.js files
4- // list of files / patterns to load in the browser
      files: [
          './src/sample.service.js',
          './tests/sample.service.spec.js',
        
          
    ],
