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
                git branch: 'main', url: 'https://github.com/asingh-2112/task-manager.git'
            }
        }

        stage('Build Backend JAR') {
            steps {
                dir('task-manager-backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./task-manager-backend'
                sh 'docker build -t $FRONTEND_IMAGE ./task-manager-frontend'
            }
        }

        stage('Push to DockerHub') {
        steps {
        script {
            docker.withRegistry('', CREDENTIALS_ID) {
                sh "docker tag $BACKEND_IMAGE $DOCKER_HUB_USER/$BACKEND_IMAGE:latest"
                sh "docker tag $FRONTEND_IMAGE $DOCKER_HUB_USER/$FRONTEND_IMAGE:latest"
                sh "docker push $DOCKER_HUB_USER/$BACKEND_IMAGE:latest"
                sh "docker push $DOCKER_HUB_USER/$FRONTEND_IMAGE:latest"
            }
        }
    }
}


        stage('Kubernetes Deploy') {
    steps {
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
            sh '''
            mkdir -p ~/.kube
            tar -xzvf $KUBECONFIG -C ~/.kube
            mv ~/.kube/config ~/.kube/config.orig
            sed 's|/home/abhishek-kumar/.minikube|~/.kube|g' ~/.kube/config.orig > ~/.kube/config
            kubectl get nodes
            '''
        }
    }
}

    }
}
