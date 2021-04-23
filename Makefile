VERSION := $(shell jq -r .version < package.json)
MAJOR := $(shell echo $(VERSION) | cut -d. -f1)
MINOR := $(shell echo $(VERSION) | cut -d. -f2)
REV := $(shell echo $(VERSION) | cut -d. -f3)

default:

release:
	mkdir src/v$(VERSION)
	cp -rT src/beta src/v$(VERSION)
	ln -nsf v$(VERSION) src/latest
	ln -nsf v$(VERSION) src/v$(MAJOR).$(MINOR)
	ln -nsf v$(MAJOR).$(MINOR) src/v$(MAJOR)
