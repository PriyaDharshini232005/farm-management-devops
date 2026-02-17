pipeline {
    agent any

    environment {
        IMAGE_NAME = "farm-app"
        SONAR_HOST = "http://localhost:9000"
        // Updated with your new token from the photo
        SONAR_TOKEN = "sqp_0f50a9cbe21f67e988452a7443d3250b4f43837f" 
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/PriyaDharshini232005/farm-management-devops.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                bat """
                "C:\\sonar-scanner\\bin\\sonar-scanner.bat" ^
                -Dsonar.projectKey=farm_system ^
                -Dsonar.sources=. ^
                -Dsonar.host.url=%SONAR_HOST% ^
                -Dsonar.token=%SONAR_TOKEN%
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
}
