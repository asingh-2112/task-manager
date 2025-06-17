pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'asingh2112' // Replace with your username
        BACKEND_IMAGE = 'task-manager-backend'
        FRONTEND_IMAGE = 'task-manager-frontend'
        CREDENTIALS_ID = 'dockerhub' // Add in Jenkins > Credentials
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/asingh-2112/task-manager.git'
            }
        }

        stage('Build Backend JAR') {
            steps {
                dir('backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withDockerRegistry('','dockerhub') {
                    sh "docker tag $BACKEND_IMAGE $DOCKER_HUB_USER/$BACKEND_IMAGE:latest"
                    sh "docker tag $FRONTEND_IMAGE $DOCKER_HUB_USER/$FRONTEND_IMAGE:latest"
                    sh "docker push $DOCKER_HUB_USER/$BACKEND_IMAGE:latest"
                    sh "docker push $DOCKER_HUB_USER/$FRONTEND_IMAGE:latest"
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh 'ansible-playbook -i ansible/hosts ansible/deploy.yml'
            }
        }
    }
}
