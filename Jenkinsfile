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
/* 
            stage('Docker Compose version'){
					steps{
						sh "docker-compose version"
					}				
				}

			stage('Docker Compose Build'){
					steps{
						sh "docker-compose build"
					}				
				}

			stage('Docker Compose Down'){
					steps{
						sh "docker-compose down"
					}				
				}	
*/
		}
	} 