/* groovylint-disable CompileStatic, DuplicateStringLiteral, FileEndsWithoutNewline, SpaceAroundOperator, SpaceBeforeOpeningBrace, TrailingWhitespace, UnnecessaryGString */
pipeline {
     
    environment { 
        PATH = "$PATH:/usr/local/bin"
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/pfe-mern" 
        registryCredential = 'docker-app-offre'
        dockerImage = ''
        //DOCKERHUB_CREDENTIALS=credentials('docker-app-offre')
    }

    agent any 

    stages{
            
            stage('Docker Compose Build'){
                    steps{
                        sh "docker-compose build"
                    }                
            }
            stage('Docker Compose Push') {
                    steps{
                        sh "docker-compose push dep-user-ms"
                    }
            }    
            stage('Cleaning up') { 
                steps { 
                    sh "docker rmi $registry:$BUILD_NUMBER" 
                }
            } 
        } 

}