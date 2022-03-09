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
			
            stage('Docker Compose build'){
					steps{
						sh "docker-compose build"
					}				
				}

            stage('Docker Compose Up'){
					steps{
						sh "docker-compose up"
					}				
				}



		}
	} 