pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:focal'
      args '--shm-size=1g'
    }
  }
  options { timeout(time: 60, unit: 'MINUTES') }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run LoginFeature tests') {
      steps {
        sh 'npx playwright test tests/LoginFeature.spec.js --project=chromium --reporter=html,junit'
        sh 'mkdir -p junit || true; find . -name "*.xml" -type f -exec cp {} junit/ \\;'
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**, junit/**, test-results/**', allowEmptyArchive: true
      junit 'junit/*.xml'
    }
  }
}
