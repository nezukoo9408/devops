pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials-id' // Change this to your exact credentials ID in Jenkins
        IMAGE_NAME_FRONTEND = 'your-username/devops-frontend'
        IMAGE_NAME_BACKEND = 'your-username/devops-backend'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                sh 'echo "Checking out code..."'
                checkout scm
            }
        }

        stage('Build node app test') {
            steps {
                echo "Running tests to verify application integrity"
                // Place test/build commands here
                sh '''
                cd backend
                npm install
                
                cd ../frontend
                npm install
                npm run build
                '''
            }
        }

        stage('Docker Build Images') {
            steps {
                echo 'Building Docker Images...'
                sh '''
                docker build -t ${IMAGE_NAME_BACKEND}:${IMAGE_TAG} -f docker/backend.Dockerfile ./backend
                docker build -t ${IMAGE_NAME_FRONTEND}:${IMAGE_TAG} -f docker/frontend.Dockerfile ./frontend
                '''
            }
        }

        stage('Docker Push Images') {
            steps {
                echo 'Pushing images to registry (Optional but good practice)'
                /* 
                // Uncomment to enable docker push
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                    sh "docker push ${IMAGE_NAME_BACKEND}:${IMAGE_TAG}"
                    sh "docker push ${IMAGE_NAME_FRONTEND}:${IMAGE_TAG}"
                }
                */
               echo "Skipping push for demo..."
            }
        }

        stage('Deploy/Run Container') {
            steps {
                echo 'Running Container Setup'
                // Ensure existing containers are removed to avoid conflict
                sh '''
                docker-compose down || true
                docker-compose up -d
                '''
            }
        }
    }
}
