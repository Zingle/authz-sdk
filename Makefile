VERSION := $(shell jq -r .version < package.json)

default:

release:
	mkdir $(VERSION)
	cp -rT pre $(VERSION)
	ln -nsf $(VERSION) latest
