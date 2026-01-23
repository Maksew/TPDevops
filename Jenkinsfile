pipeline {
  agent none
  stages {
    stage('Build') {
      agent { 
        docker { 
          image 'mcr.microsoft.com/playwright:v1.57.0-noble'
        } 
      }
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test Unit') {
      agent { 
        docker { 
          image 'mcr.microsoft.com/playwright:v1.57.0-noble'
        } 
      }
      steps {
        sh 'npm install'
        sh 'npm run test'
      }
      post {
        always {
          publishHTML([
            allowMissing: true, 
            alwaysLinkToLastBuild: false, 
            keepAll: true, 
            reportDir: 'html', 
            reportFiles: 'index.html', 
            reportName: 'VitestReport', 
            reportTitles: '', 
            useWrapperFileDirectly: true
          ])
        }
      }
    }
    stage('Test E2E') {
      agent { 
        docker { 
          image 'mcr.microsoft.com/playwright:v1.57.0-noble'
        } 
      }
      steps {
        sh 'npm install'
        sh 'npm run test:e2e'
      }
      post {
        always {
          publishHTML([
            allowMissing: true, 
            alwaysLinkToLastBuild: false, 
            keepAll: true, 
            reportDir: 'playwright-report', 
            reportFiles: 'index.html', 
            reportName: 'PlaywrightReport', 
            reportTitles: '', 
            useWrapperFileDirectly: true
          ])
        }
      }
    }
  }
}
