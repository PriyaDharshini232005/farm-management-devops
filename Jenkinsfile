pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "farm-frontend"
        BACKEND_IMAGE = "farm-backend"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/PriyaDharshini232005/farm-management-devops.git'
            }
        }

        stage('Build Backend Docker') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE .'
                }
            }
        }

        stage('Build Frontend Docker') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                // Stop existing containers if running
                sh 'docker rm -f farm-backend || true'
                sh 'docker rm -f farm-frontend || true'

                // Run backend and frontend
                sh 'docker run -d -p 5000:5000 --name farm-backend $BACKEND_IMAGE'
                sh 'docker run -d -p 3001:3000 --name farm-frontend $FRONTEND_IMAGE'
            }
        }
    }
}