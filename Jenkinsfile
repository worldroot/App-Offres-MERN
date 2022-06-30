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
            
            stage('User-ms Tests'){
                    steps{
                        dir("Backend/user-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                    }                
                }
            
            stage('Categorie-ms Tests'){
                    steps{
                        dir("Backend/categorie-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                    }                
                }

            stage('Offre-ms Tests'){
                    steps{
                        dir("Backend/offre-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                    }                
                }

            stage('Notif-ms Tests'){
                    steps{
                        dir("Backend/notification-ms"){
                            sh "npm install"
                            sh "npm test"
                        }
                    }                
                }
            stage('User-ms SonarQube'){
                    steps{
                        dir("Backend/user-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                    }                
                }
            stage('Categorie-ms SonarQube'){
                    steps{
                        dir("Backend/categorie-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                    }                
                }
            stage('Offre-ms SonarQube'){
                    steps{
                        dir("Backend/offre-ms"){
                            sh "npm install"
                            sh "npm run sonar"
                        }
                    }                
                }
			stage('Notif-ms SonarQube'){
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