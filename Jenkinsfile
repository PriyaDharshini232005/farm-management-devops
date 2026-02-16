pipeline {
    agent any

    environment {
        IMAGE_NAME = "farm-app"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Stop Old Container') {
            steps {
                bat "docker rm -f farm-app || exit 0"
            }
        }

        stage('Run Container') {
            steps {
                bat "docker run -d -p 5000:5000 --name farm-app %IMAGE_NAME%"
            }
        }
    }
}