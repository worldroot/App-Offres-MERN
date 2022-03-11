pipeline {

	
	environment { 
        PATH = "$PATH:/usr/local/bin"
        COMPOSE_FILE = "docker-compose.yml"
        registry = "ghassenbogh/pfe-mern" 
        registryCredential = 'dockerHub'
        dockerImage = '' 
    }

	agent any 

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
								withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: registryCredential, usernameVariable: 'ghassenbogh', passwordVariable: 'gh24as68007']]) {
									usr = USERNAME
									pswd = PASSWORD
								}
								docker.withRegistry('', registryCredential) {
									sh "docker login -u ${usr} -p ${pswd}"
									def	image = docker.build registry + ":$BUILD_NUMBER"
									image.push 'latest'
								}
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