
pipeline {
    agent any // Run on any available agent; this pipeline uses Windows bat commands.

    options {
        timestamps() // Add timestamps to Jenkins console output.
    }

    parameters {
        choice(
            name: 'TEST_ENV', // Parameter for selecting the target environment.
            choices: ['qa', 'uat'], // Available environments.
            description: 'Select the environment for Playwright tests.'
        )

        choice(
            name: 'TEST_TARGET', // Parameter for selecting which tests to execute.
            choices: [
                'all',
                'login-api',
                'multiple-storage',
                'network-intercept-response',
                'get-products-name',
                'handle-child-page',
                'login-fixture-test',
                'parallel-test',
                'parameterized-test',
                'register-user',
                'ui-basics',
                'e2e'
            ],
            description: 'Select all tests or one individual test file.'
        )
    }

    stages {
        stage('Check Environment') {
            steps {
                bat 'where node' // Display the Node.js executable location.
                bat 'node --version' // Print the Node.js version.
                bat 'where npm' // Display the npm executable location.
                bat 'npm --version' // Print the npm version.
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci' // Install exact dependency versions from package-lock.json.
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install' // Install browser binaries required by Playwright projects.
            }
        }

        stage('Run Automation Tests') {
            steps {
                script {
                    def testPaths = [ // Map each Jenkins selection to its corresponding test file.
                        'all'                        : '',
                        'login-api'                  : 'tests/api/login-api.spec.ts',
                        'multiple-storage'           : 'tests/api/multiple-storage.spec.ts',
                        'network-intercept-response' : 'tests/api/network-intercept-response.spec.ts',
                        'get-products-name'           : 'tests/ui/get-products-name.spec.ts',
                        'handle-child-page'           : 'tests/ui/handle-child-page.spec.ts',
                        'login-fixture-test'          : 'tests/ui/login-fixture-test.spec.ts',
                        'parallel-test'               : 'tests/ui/parallel-test.spec.ts',
                        'parameterized-test'          : 'tests/ui/parameterized-test.spec.ts',
                        'register-user'               : 'tests/ui/register-user.spec.ts',
                        'ui-basics'                   : 'tests/ui/ui-basics.spec.ts',
                        'e2e'                         : 'tests/ui/e2e.spec.ts'
                    ]

                    def selectedPath = testPaths[params.TEST_TARGET] // Find the path for the selected test target.

                    if (selectedPath == null) { // Check whether the selected target exists in the mapping.
                        error("Unknown test target: ${params.TEST_TARGET}") // Stop with a clear error if it is invalid.
                    }

                    withEnv([
                        "TEST_ENV=${params.TEST_ENV}", // Pass the selected environment to the test process.
                        "CI=true" // Indicate that tests are running in CI.
                    ]) {
                        if (params.TEST_TARGET == 'all') { // Run the complete test suite.
                            bat 'npx playwright test --workers=1' // Execute all discovered tests using one worker.
                        } else {
                            bat "npx playwright test ${selectedPath} --workers=1" // Execute only the selected test file.
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**', // Archive generated reports and test results.
                allowEmptyArchive: true // Do not fail if no matching artifacts exist.
            )
        }
    }
}
