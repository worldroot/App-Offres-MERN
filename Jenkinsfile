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
			
            
            stage('Docker Compose version'){
					steps{
						sh "docker-compose version"
					}				
				}

            stage('Docker Compose Up'){
					steps{
						sh "docker-compose up"
					}				
				}

             stage('Docker Compose Down'){
					steps{
						sh "docker-compose down"
					}				
				}

		}
	} 