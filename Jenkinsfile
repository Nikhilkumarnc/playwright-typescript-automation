
pipeline {
    agent any // Run this pipeline on any available Jenkins agent.

    stages { // Define the sequence of stages Jenkins executes.

        stage('Check Environment') { // Verify that Node.js and npm are available.
            steps {
                bat 'node --version' // Print the installed Node.js version; Playwright needs Node.js.
                bat 'npm --version'  // Print the installed npm version; npm installs project dependencies.
            }
        }

        stage('Checkout Confirmation') { // Document the source-code checkout step.
            steps {
                echo 'Source code was checked out by Jenkins' // Print a message in the Jenkins console.
                // This message does not perform a checkout; SCM checkout must be configured separately.
            }
        }

        stage('Install Dependencies') { // Install the dependencies required by the project.
            steps {
                bat 'npm ci' // Install exact versions from package-lock.json for a reproducible build.
            }
        }

        stage('Install Browsers') { // Ensure Playwright's Chromium browser is installed.
            steps {
                bat 'npx playwright install chromium' // Download the Chromium build required by this Playwright version.
            }
        }

        stage('Run Automation Tests') { // Execute the automated Playwright test suite.
            steps {
                bat 'npx playwright test' // Discover and run tests using playwright.config.ts and its settings.
            }
        }
    }

    post { // Define actions Jenkins performs after the pipeline finishes.
        always { // Run this block whether the build succeeds or fails.
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**', // Include files under both report and test-results folders.
                allowEmptyArchive: true // Do not fail the build solely because these folders contain no files.
            ) // Store matching artifacts in Jenkins so they can be accessed from the build page.
        }
    }
}
