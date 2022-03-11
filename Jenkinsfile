pipeline {
	agent any 
	
	environment { 
        PATH = "$PATH:/usr/local/bin"
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/devopstimesheet" 
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
			stage('Docker Compose Build'){
					steps{
						sh "docker-compose build"
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
		}
	} 