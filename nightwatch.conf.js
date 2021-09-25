const chromdriver = require('chromedriver');
const geckdriver = require('geckodriver');

module.exports ={
    test_settings:{
      
        chrome:{
            webdriver:{     
                start_process:true,
                server_path: chromdriver.path,
                port: 4444,
                cli_args: ['--port=4444'],
                
            },
            screenshots: {
                enabled: true,
                path: 'screenshots',
            },
            desiredCapabilities:{
                browserName: 'chrome',
            },
        },
        firefox:{
            webdriver:{     
                start_process:true,
                server_path: geckdriver.path,
                port: 4445,
                cli_args: ['--port=4445'],
            },
            screenshots: {
                enabled: true,
                path: 'screenshots'
            },
            desiredCapabilities:{
                browserName: 'firefox',
            },
        }
    }
}
