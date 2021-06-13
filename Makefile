.PHONY: zip

zip:
	zip -r nh-chime.zip ./ -x '*.idea*' -x '*.git*' -x 'Makefile'
