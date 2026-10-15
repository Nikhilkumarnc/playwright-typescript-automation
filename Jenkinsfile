pipeline {
    agent any // Run on any available Jenkins agent; this pipeline requires a Windows agent because it uses bat commands.

    options {
        timestamps() // Add timestamps to console output to help identify when each pipeline step runs.
    }

    parameters {
        choice(
            name: 'TEST_ENV', // Parameter used to select the target environment.
            choices: ['qa', 'uat'], // Available environments.
            description: 'Select the environment for Playwright tests.' // Explain the parameter in Jenkins.
        )

        choice(
            name: 'TEST_TARGET', // Parameter used to select which tests to execute.
            choices: [
                'all', // Run the complete Playwright test suite.
                'login-api', // Run the login API test file.
                'multiple-storage', // Run the multiple-storage API test file.
                'network-intercept-response', // Run the network interception API test file.
                'get-products-name', // Run the product-name UI test file.
                'handle-child-page', // Run the child-page UI test file.
                'login-fixture', // Run the login fixture UI test file.
                'parallel-test', // Run the parallel-test file.
                'parameterized-test', // Run the parameterized-test file.
                'register-user', // Run the user-registration UI test file.
                'ui-basics' // Run the basic UI test file.
            ],
            description: 'Select all tests or one individual test file.' // Explain the available test selections.
        )
    }

    stages { // Define the stages Jenkins executes in sequence.

        stage('Check Environment') { // Verify Node.js and npm are available to Jenkins.
            steps {
                bat 'where node' // Display the location of the Node.js executable.
                bat 'node --version' // Print the Node.js version.
                bat 'where npm' // Display the location of the npm executable.
                bat 'npm --version' // Print the npm version.
            }
        }

        stage('Install Dependencies') { // Install the project dependencies in the Jenkins workspace.
            steps {
                bat 'npm ci' // Install exact dependency versions recorded in package-lock.json.
            }
        }

        stage('Install Playwright Browser') { // Ensure the required browser is installed.
            steps {
                bat 'npx playwright install' // Install the Chromium build required by this Playwright version.
            }
        }

        stage('Run Automation Tests') { // Run the tests for the selected environment and test scope.
            steps {
                script { // Use Groovy logic to select the correct test file.

                    def testPaths = [ // Map each Jenkins test selection to a test file in the repository.
                        'all'                        : '', // An empty path means run the entire suite.
                        'login-api'                  : 'tests/api/login-api.spec.ts',
                        'multiple-storage'           : 'tests/api/multiple-storage.spec.ts',
                        'network-intercept-response' : 'tests/api/network-intercept-response.spec.ts',
                        'get-products-name'           : 'tests/ui/get-products-name.spec.ts',
                        'handle-child-page'           : 'tests/ui/handle-child-page.spec.ts',
                        'login-fixture'               : 'tests/ui/login-fixture-test.spec.ts',
                        'parallel-test'              : 'tests/ui/parallel-test.spec.ts',
                        'parameterized-test'          : 'tests/ui/parameterized-test.spec.ts',
                        'register-user'               : 'tests/ui/register-user.spec.ts',
                        'ui-basics'                   : 'tests/ui/ui-basics.spec.ts'
                    ]

                    def selectedPath = testPaths[params.TEST_TARGET] // Find the file corresponding to the user's selection.

                    if (selectedPath == null) { // Check whether the selected test target exists in the mapping.
                        error("Unknown test target: ${params.TEST_TARGET}") // Stop the build with a clear error for an invalid selection.
                    }

                    withEnv(["TEST_ENV=${params.TEST_ENV}"]) { // Make the selected environment available to Playwright and env.config.ts.

                        if (params.TEST_TARGET == 'all') { // Check whether the user selected the complete test suite.
                            bat 'npx playwright test' // Run all tests discovered by playwright.config.ts.
                        } else { // Otherwise, execute only the selected test file.
                            bat "npx playwright test ${selectedPath}" // Run the selected file, not the entire suite.
                        }
                    }
                }
            }
        }
    }

    post { // Define actions Jenkins performs after the stages finish.

        always { // Run this block whether tests pass or fail.
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**', // Select generated Playwright and Allure report files.
                allowEmptyArchive: true // Avoid failing the build solely because no matching files were generated.
            ) // Save matching artifacts to the Jenkins build page for later inspection.
        }
    }
}
