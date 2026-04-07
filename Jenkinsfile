pipeline {
    agent any

    environment {
        IMAGE_NAME_FRONTEND = 'nezukoo9408/devops-frontend'
        IMAGE_NAME_BACKEND = 'nezukoo9408/devops-backend'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                bat 'echo Checking out code...'
                checkout scm
            }
        }

        stage('Build node app test') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
                dir('frontend') {
                    bat '''
                    npm install
                    npm run build
                    '''
                }
            }
        }

        stage('Docker Build Images') {
            steps {
                bat '''
                docker build -t %IMAGE_NAME_BACKEND%:%IMAGE_TAG% -f docker/backend.Dockerfile backend
                docker build -t %IMAGE_NAME_FRONTEND%:%IMAGE_TAG% -f docker/frontend.Dockerfile frontend
                '''
            }
        }

        stage('Deploy/Run Container') {
            steps {
                bat '''
                docker-compose down
                docker-compose up --build -d
                echo Waiting for MySQL to initialize...
                timeout /t 20
                docker-compose exec backend-service npm run seed || echo seed skipped
                '''
            }
        }
    }
}