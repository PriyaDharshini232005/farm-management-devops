pipeline {
    agent any

    environment {
        IMAGE_NAME = "farm-app"
        SONAR_HOST = "http://localhost:9000"
        // Replace the line below with your real token from SonarQube
        SONAR_TOKEN = "sqa_your_generated_token_here" 
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Connects to your GitHub and pulls the 'main' branch
                git branch: 'main', url: 'https://github.com/PriyaDharshini232005/farm-management-devops.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                // Runs the static code analysis automatically
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
                // Wraps your application into a Docker Image
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Stop Old Container') {
            steps {
                // Cleans up previous deployments to avoid port conflicts
                bat "docker stop farm-app || exit 0"
                bat "docker rm farm-app || exit 0"
            }
        }

        stage('Run Container') {
            steps {
                // Deploys the new version of your app
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