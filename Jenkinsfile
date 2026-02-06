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
    stage('Deploy to Netlify') {
      agent { 
        docker { 
          image 'mcr.microsoft.com/playwright:v1.57.0-noble'
        } 
      }
      when {
        branch 'main'
      }
      environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')
      }
      steps {
        sh 'npm install'
        sh 'npm run build'
        sh 'node_modules/netlify-cli/bin/run.js deploy --prod --site tpcid-chess.netlify.app'
      }
    }
    stage('Docker Build & Push') {
      agent any
      when {
        branch 'main'
      }
      environment {
        CI_REGISTRY = 'ghcr.io'
        CI_REGISTRY_USER = 'Maksew'
        CI_REGISTRY_IMAGE = "${CI_REGISTRY}/${CI_REGISTRY_USER}/chess"
        CI_REGISTRY_PASSWORD = credentials('CI_REGISTRY_PASSWORD')
      }
      steps {
        sh 'docker build --network=host -t $CI_REGISTRY_IMAGE .'
        sh 'echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY'
        sh 'docker push $CI_REGISTRY_IMAGE'
      }
    }
  }
}
