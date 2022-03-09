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