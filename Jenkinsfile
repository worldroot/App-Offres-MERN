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
			
			stage('Docker Versions'){

                 withEnv(["PATH=$PATH:~/.local/bin"]){
                    sh '''
                            docker --verion
                            docker compose version
                        '''
                }
					steps{
						
					}				
				}



		}
	} 