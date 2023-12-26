setup:
	docker volume create --name=casa-roma-db
	cp -n .env.example .env

install:
	docker-compose -f docker-compose.yaml -f docker/docker-compose.install.yaml up casa-roma

init-db:
	docker-compose run --rm casa-roma run init:db

db-migrate:
	docker-compose run --rm casa-roma run db:migrate

db-migrate-revert:
	docker-compose run --rm casa-roma run db:migrate:revert

build:
	docker build .

dev:
	docker-compose -f docker-compose.yaml -f docker/docker-compose.dev.yaml up casa-roma

debug:
	docker-compose -f docker-compose.yaml -f docker/docker-compose.debug.yaml up casa-roma

down:
	docker-compose down --remove-orphans
