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
            stage('Jest Tests'){
                    steps{
                        dir("Backend/user-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                        dir("Backend/categorie-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                        dir("Backend/offre-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                        dir("Backend/notification-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                    }                
            }
            stage('SonarQube'){
                    steps{
                        dir("Backend/user-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                        dir("Backend/categorie-ms"){
                                    sh "npm install"
                                    sh "npm run sonar"
                        }
                        dir("Backend/offre-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                        dir("Backend/notification-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                    } 
            }
            stage('Docker Compose Build'){
                    steps{
                        sh "docker-compose build"
                    }                
            }
            stage('Push') {
                    steps{
                        sh "docker-compose push dep-user-ms:$BUILD_NUMBER"
                    }
            }    
            stage('Cleaning up') { 
                steps { 
                    sh "docker rmi $registry:$BUILD_NUMBER" 
                }
            } 
        } 

}