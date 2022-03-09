pipeline {
	agent any 
	
	environment { 
        registry = "ghassenbogh/devopstimesheet" 
        registryCredential = 'dockerHub'
        dockerImage = '' 
    }


	stages{
			
			stage('Docker Compose Build'){
					steps{
						bat "docker-compose build"
					}				
				}

            stage('Docker Compose Up'){
					steps{
						bat "docker-compose up"
					}				
				}
							
		
			
		}
	} 