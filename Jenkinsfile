/* groovylint-disable CompileStatic, DuplicateStringLiteral, FileEndsWithoutNewline, SpaceAroundOperator, SpaceBeforeOpeningBrace, TrailingWhitespace, UnnecessaryGString */
pipeline {
    agent any 
        
    environment { 
/*         PATH = "$PATH:/usr/local/bin"
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/pfe-mern" 
        registryCredential = 'dockerHub'
        dockerImage = ''  */
        DOCKERHUB_CREDENTIALS=credentials('docker-app-offre')
    }

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

                    steps {
                        sh 'docker push ghassenbogh/pfe-mern:latest'
                    }
		    }


            /*
            stage('Building Images'){
                    steps{
                        dir("Backend/user-ms"){
                            script{
                                dockerImage = docker.build registry + ":$BUILD_NUMBER"
                            }
                        }    
                    }                
            }
            stage('Deploy Images'){
                    steps{
                        dir("Backend/user-ms"){
                            script{
                                docker.withTool('') { 

                                    docker.withRegistry( '', registryCredential ) 
                                    {dockerImage.push()}

                                }
                                
                            }
                        }
                    }
            }
            */ 
    }
} 