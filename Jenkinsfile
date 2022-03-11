pipeline {
	agent any 
	
	environment { 
        PATH = "$PATH:/usr/local/bin"
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/pfe-mern" 
        registryCredential = 'dockerHub'
        dockerImage = '' 
    }


	stages{
			stage('User-ms Jest Tests'){
					steps{
						dir("Backend/user-ms"){
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
								docker.withRegistry( '', registryCredential ) 
								{dockerImage.push()}
							}
						}
					}
			}
			stage('Cleaning up') {
					steps{
						dir("Backend/user-ms"){
								sh "docker rmi $registry:$BUILD_NUMBER"
						}
					}
			}
		}
	} 