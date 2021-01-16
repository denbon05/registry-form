install: install-deps

build:
	npm build

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

.PHONY: all test clean