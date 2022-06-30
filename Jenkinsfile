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
            stage('Docker Push Images') {
                    steps{
                        dir("Backend/user-ms"){
                            sh "docker tag user-ms ghassenbogh/user-ms:$BUILD_NUMBER"
                            sh "docker push ghassenbogh/user-ms:$BUILD_NUMBER"
                        }
                        dir("Backend/categorie-ms"){
                            sh "docker tag categorie-ms ghassenbogh/categorie-ms:$BUILD_NUMBER"
                            sh "docker push ghassenbogh/categorie-ms:$BUILD_NUMBER"
                        }
                        dir("Backend/offre-ms"){
                            sh "docker tag offre-ms ghassenbogh/offre-ms:$BUILD_NUMBER"
                            sh "docker push ghassenbogh/offre-ms:$BUILD_NUMBER"
                        }
                        dir("Backend/notification-ms"){
                            sh "docker tag notification-ms ghassenbogh/notification-ms:$BUILD_NUMBER"
                            sh "docker push ghassenbogh/notification-ms:$BUILD_NUMBER"
                        }
                        dir("Frontend/admin"){
                            sh "docker tag react-client ghassenbogh/react-client:$BUILD_NUMBER"
                            sh "docker push ghassenbogh/react-client:$BUILD_NUMBER"
                        }
                        dir("Frontend/client"){
                            sh "docker tag react-admin ghassenbogh/react-admin:$BUILD_NUMBER"
                            sh "docker push ghassenbogh/react-admin:$BUILD_NUMBER"
                        }
                    }          
            }  
            stage('Docker Pull Images') {
                    steps{
                        dir("Backend/user-ms"){
                            sh "docker pull ghassenbogh/user-ms:$BUILD_NUMBER"
                        }
                        dir("Backend/categorie-ms"){
                            sh "docker pull ghassenbogh/categorie-ms:$BUILD_NUMBER"
                        }
                        dir("Backend/offre-ms"){
                            sh "docker pull ghassenbogh/offre-ms:$BUILD_NUMBER"
                        }
                        dir("Backend/notification-ms"){
                            sh "docker pull ghassenbogh/notification-ms:$BUILD_NUMBER"
                        }
                        dir("Frontend/admin"){
                            sh "docker pull ghassenbogh/react-client:$BUILD_NUMBER"
                        }
                        dir("Frontend/client"){
                            sh "docker pull ghassenbogh/react-admin:$BUILD_NUMBER"
                        }
                    }          
            }      
            stage('Cleaning up') { 
                    steps { 
                        sh "docker rmi ghassenbogh/user-ms:$BUILD_NUMBER"
                        sh "docker rmi ghassenbogh/categorie-ms:$BUILD_NUMBER"
                        sh "docker rmi ghassenbogh/offre-ms:$BUILD_NUMBER" 
                        sh "docker rmi ghassenbogh/notification-ms:$BUILD_NUMBER"
                        sh "docker rmi ghassenbogh/react-client:$BUILD_NUMBER"
                        sh "docker rmi ghassenbogh/offre-ms:$BUILD_NUMBER"
                    }
            } 
        } 

}