pipeline {
	agent any 
	
	environment { 
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/devopstimesheet" 
        registryCredential = 'dockerHub'
        dockerImage = '' 
    }


	stages{
			
			stage('Docker Versions'){
					steps{
						sh '''
                            docker --verion
                            docker compose version
                        '''
					}				
				}


                
		}
	} 