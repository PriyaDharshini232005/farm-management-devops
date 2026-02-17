pipeline {
    agent any

    environment {
        IMAGE_NAME = "farm-app"
        SONAR_HOST = "http://localhost:9000"
        SONAR_TOKEN = "<PASTE_YOUR_GENERATED_TOKEN_HERE>"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/PriyaDharshini232005/farm-management-devops.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                bat """
                sonar-scanner ^
                -Dsonar.projectKey=farm-management-devops ^
                -Dsonar.sources=. ^
                -Dsonar.host.url=%SONAR_HOST% ^
                -Dsonar.login=%SONAR_TOKEN%
                """
            }
        }

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

    post {
        always {
            echo 'Pipeline finished — check SonarQube, Docker containers, and application.'
        }
    }
}