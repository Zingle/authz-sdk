VERSION := $(shell jq -r .version < package.json)
MAJOR := $(shell echo $(VERSION) | cut -d. -f1)
MINOR := $(shell echo $(VERSION) | cut -d. -f2)
REV := $(shell echo $(VERSION) | cut -d. -f3)

default:

release:
	mkdir src/v$(VERSION)
	rm -fr src/latest src/v$(MAJOR) src/v$(MAJOR).$(MINOR)
	cp -rT src/beta src/latest
	cp -rT src/beta src/v$(MAJOR).$(MINOR).$(REV)
	cp -rT src/beta src/v$(MAJOR).$(MINOR)
	cp -rT src/beta src/v$(MAJOR)
