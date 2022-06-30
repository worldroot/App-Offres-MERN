/* groovylint-disable UnnecessaryGString */
pipeline {

    
    environment { 
        PATH = "$PATH:/usr/local/bin"
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/pfe-mern" 
        registryCredential = 'dockerHub'
        dockerImage = '' 
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
                    } 
                    steps{
                        dir("Backend/categorie-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                    } 
                    steps{
                        dir("Backend/offre-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                    }  
                    steps{
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