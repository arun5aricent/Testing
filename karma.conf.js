
// Karma configuration
// Generated on Fri Jul 20 2018 03:32:24 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

      plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine-jquery' ,'jasmine'],


    // list of files / patterns to load in the browser
      files: [
      //load fixtures
          //{
          //    pattern: 'tests/**/*.json',
          //    watched: true,
          //    served: true,
          //    included: false
          //},

          //'tests/helpers/js.helpers.js',
          //'src/mock.js',         

          //'../../static/internal/common/js/eventLogger.js',
          //'../../static/task-js',  
          //'../../static/internal/common/js/io.js',
          //'../../static/internal/common/js/iframe-io.js',
          //'../../static/internal/services/gadget/gadgetservices.js',
        
          //'../../static/internal/gadget/js/EmailClient.js',
          //'../emailclient/scripts/emailclient.js',
          //'fake.methods/emailclient.fake.js',

          //"tests/fixtures/email.dom.js",
          './tests/emailclient.spec.js',
                    
       
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress', 'html', 'junit'],
 
    htmlReporter: {
      outputFile: 'tests.report/emailTests.html',
            
      // Optional
        pageTitle: 'EmailClientUnitTests Unit Tests',
        subPageTitle: 'EmailClientUnitTests Unit Test With Karma & Jasmine',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
      },
      // the default configuration
      junitReporter: {
          outputDir: '', // results will be saved as $outputDir/$browserName.xml
          outputFile: 'tests.report/emailTests.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
          suite: '', // suite will become the package name attribute in xml testsuite element
          useBrowserName: false, // add browser name to report and classes names
          nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
          classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
          properties: {} ,// key value pair of properties to add to the <properties> section of the report
          xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
      },
   

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
