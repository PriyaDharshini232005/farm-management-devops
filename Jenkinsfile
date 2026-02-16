pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "farm-frontend"
        BACKEND_IMAGE = "farm-backend"
    }

    stages {

        stage('Build Backend Docker') {
            steps {
                dir('backend') {
                    bat "docker build -t %BACKEND_IMAGE% ."
                }
            }
        }

        stage('Build Frontend Docker') {
            steps {
                dir('frontend') {
                    bat "docker build -t %FRONTEND_IMAGE% ."
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                bat "docker rm -f farm-backend || exit 0"
                bat "docker rm -f farm-frontend || exit 0"

                bat "docker run -d -p 5000:5000 --name farm-backend %BACKEND_IMAGE%"
                bat "docker run -d -p 3001:3000 --name farm-frontend %FRONTEND_IMAGE%"
            }
        }
    }
}