How to prepared for running automation :
1. Install node.js and chrome version 93
2. Git clone : https://github.com/ahmads15/web-ruang-guru.git
3. Run Automation : npm run e2e-test features\search.feature -- --tags "@s1"
   note : if u want run another scenario just replace @ on tags ""
4. Folder Structure :
    - base functions -> untuk selenium nightwatch js
    - features -> testcase cucumber gherkin language
    - pages -> for logic or action 
    - step definition -> defintion of cucumber gherkin
    - report -> result automation 
    - screenshoots -> if failed u can see attachment on screenshoots
    - test_data -> for data
