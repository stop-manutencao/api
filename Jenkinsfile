node {

    currentBuild.result = "SUCCESS"

    try {

        stage('Delete Repos Stop'){
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/stop/api"'
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/stop/front"'
        }

        stage('Clone Repos Stop Front e Back'){
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homologacao http://projetos@www.tools.ages.pucrs.br/StopCidadania/api.git /opt/docker/stop/api"'
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homologacao http://projetos@www.tools.ages.pucrs.br/StopCidadania/front.git /opt/docker/stop/front"'
        }

        stage('Install and Build Stop Front Vue'){
            sh 'ssh root@10.32.223.4 -p 5439 "/opt/docker/stop/api/ic.sh"'
        }

        stage('Down Images DB, Api and Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/stop/api; docker-compose down; docker-compose -f docker-compose-web.yml down"'
        }

        stage('Build and Up Docker Image Api v2'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/stop/api; docker-compose up --build -d"'
        }

        stage('Build and Up Docker Image Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/stop/api; docker-compose -f docker-compose-web.yml up --build -d"'
        }

        stage('Success'){
            mail body: 'Stop project build successful in HML',
                     from: 'jenkins@ages.com',
                     replyTo: 'cassio.trindade@pucrs.br',
                     subject: 'Success CI Stop',
                     to: 'cassio.trindade@pucrs.br'
        }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "Stop roject build error is here: ${env.BUILD_URL}" ,
            from: 'jenkins@ages.com',
            replyTo: 'cassio.trindade@pucrs.br',
            subject: 'Error CI Stop',
            to: 'cassio.trindade@pucrs.br'

        throw err
    }

}

