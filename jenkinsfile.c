pipeline {
    agent any

    environment {
        IMAGE_NAME = "farm-app"
        SONAR_HOST = "http://localhost:9000"
        SONAR_TOKEN = "sqp_680b27994f47325e98b462d00a4781b63dcfd240" 
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/PriyaDharshini232005/farm-management-devops.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                // If this fails, replace 'sonar-scanner' with your full double-slashed path
                bat "sonar-scanner -Dsonar.projectKey=farm_system -Dsonar.sources=. -Dsonar.host.url=%SONAR_HOST% -Dsonar.token=%SONAR_TOKEN%"
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
            echo 'Pipeline finished.'
        }
    }
}