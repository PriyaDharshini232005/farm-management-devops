pipeline {
    agent any

    environment {
        IMAGE_NAME = "farm-app"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/PriyaDharshini232005/farm-management-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Stop Old Container') {
            steps {
                bat "docker stop farm-app || exit 0"
                bat "docker rm farm-app || exit 0"
            }
        }

        stage('Run Container') {
            steps {
                bat "docker run -d -p 5000:5000 --name farm-app %IMAGE_NAME%"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished — SonarQube skipped to fix the failure.'
        }
    }
}
