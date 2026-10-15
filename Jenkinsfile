
pipeline {
    agent any // Use an available Jenkins agent; this setup assumes Windows.

    options {
        timestamps() // Add timestamps to the Jenkins console log.
    }

    stages {
        stage('Check Environment') {
            steps {
                bat 'node --version' // Verify Node.js is available.
                bat 'npm --version'  // Verify npm is available.
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci' // Install the exact dependencies in package-lock.json.
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
                // Install Chromium; adjust if your config requires other browsers.
            }
        }

        stage('Run QA Tests') {
            steps {
                bat 'npm run all-tests:qa'
                // Run your existing QA script, including TEST_ENV=qa.
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**,allure-results/**',
                allowEmptyArchive: true
            ) // Preserve generated reports and test artifacts in Jenkins.
        }
    }
}
