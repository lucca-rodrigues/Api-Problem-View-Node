REGION := "us-east-1"
BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
ENVIRONMENT := ${ENVIRONMENT}

.PHONY: cleaning env push tagging local_build pipeline_build

cleaning:
	@echo "Cleaning local env files"
	@find . -maxdepth 1 -type f -name ".env*"  -exec bash -c "git rm --cached {} 2> /dev/null; rm {}" \;

env: cleaning
	@echo "Creating local env file for development"
	@aws secretsmanager --region ${REGION} get-secret-value --secret-id api-problem-views/${ENVIRONMENT}/secrets |\
	  jq --raw-output '.SecretString' |\
	  jq '.' | tr -d '" , { }' |\
	  sed 's/:/=/g' | \
	  sed 's/https=/https:/g' > .env

	@if [ ! -s .env ]; then\
        echo "It's not possible get the credentials from secretsmanager";\
		exit 1;\
    fi
	
push: cleaning
	@echo "Pushing your code to remote"
	@git push origin ${BRANCH}

tagging: cleaning
	@echo "Tagging your branch"
	@git tag $(TAG) && git push origin $(TAG)

local_build: env
	@docker build -t api-problem-views . --no-cache
	@make cleaning

pipeline_build:
	@buildah login --username AWS --password $AWS_AUTH $ECR_REPOSITORY
	@buildah build \
		--build-arg=REPOSITORY="${REPOSITORY}" --build-arg=APP_VERSION="${APP_VERSION}" \
		--build-arg=RELEASE_DATE="${RELEASE_DATE}" --build-arg=MAINTAINER="${MAINTAINER}" \
		--label commit_id="{$COMMIT_ID}" \
		-t ${BUILD_REPOSITORY}:${BUILD_TAG} .
	@buildah push ${BUILD_REPOSITORY}:${BUILD_TAG}