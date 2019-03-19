@Library('dynatrace@master') _

pipeline {
  agent {
    label 'nodejs'
  }
  environment {
    APP_NAME = "bookinfo-productpage"
    VERSION = readFile('version').trim()
    DOCKER_REPO = "${env.DOCKER_REGISTRY_URL}/${env.APP_NAME}"
    TAG = "${env.VERSION}"
  }
  stages {
    stage('Node build') {
      steps {
        checkout scm
        container('nodejs') {
          sh 'npm install'
        }
      }
    }
    stage('Docker build') {
      steps {
        container('docker') {
          sh "docker build -t ${env.DOCKER_REPO} ."
          sh "docker tag ${env.DOCKER_REPO} ${env.DOCKER_REPO}:${env.TAG}"
        }
      }
    }
    stage('Docker push to registry'){
      steps {
        container('docker') {
          withCredentials([usernamePassword(credentialsId: 'registry-creds', passwordVariable: 'TOKEN', usernameVariable: 'USER')]) {
            sh "docker login --username=${USER} --password=${TOKEN} https://${env.DOCKER_REGISTRY_URL}"
            sh "docker push ${env.DOCKER_REPO}:${env.TAG}"
          }
        }
      }
    }
  }
}
