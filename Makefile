.ONESHELL:

public/main.js: $(wildcard frontend/src/*.purs)
	cd frontend
	spago bundle-app && cp index.js ../public/main.js
	cd ..

.stack-work/dist/x86_64-linux/ghc-9.6.6/build/neuropsicotesis-exe/neuropsicotesis-exe: $(wildcard src/*/*.hs) $(wildcard app/*.hs)
	stack build

test: public/main.js .stack-work/dist/x86_64-linux/ghc-9.6.6/build/neuropsicotesis-exe/neuropsicotesis-exe
	stack run
