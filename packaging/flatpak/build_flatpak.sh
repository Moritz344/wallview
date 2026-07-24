#!/bin/bash
flatpak-builder --user --install --force-clean build-dir io.github.Moritz344.wallview.yml
flatpak run io.github.Moritz344.wallview
