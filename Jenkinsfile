pipeline {
	agent any 
	
	environment { 
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/devopstimesheet" 
        registryCredential = 'dockerHub'
        dockerImage = '' 
    }


	stages{
			
			stage('Docker Version'){
					steps{
						sh "docker --verion"
					}				
				}

            stage('Docker Compose Version'){
					steps{
						sh "docker compose version"
					}				
				}
							
		
			
		}
	} 