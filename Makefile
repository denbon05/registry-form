install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

pretty:
	npx prettier --write .

cover:
	npm test -- --coverage --coverageProvider=v8

test:
	npm test

.PHONY: test