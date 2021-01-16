install: install-deps

build:
	npm run build

install-deps:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

format:
	npm run format

cover:
	npm run test:coverage

test:
	npm test

server:
	npm run server

dev:
	npm run dev

heroku:
	heroku local

.PHONY: test build server dev