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

client:
	npm run start

server:
	npm run server

dev:
	npm run dev

heroku:
	heroku local

droptable:
	npm run droptable

.PHONY: test build server dev droptable