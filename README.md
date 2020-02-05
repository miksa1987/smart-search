## SMART SEARCH

A smart search to find pictures containing specific things.
For now this tool works only on UNIX based systems(Linux, macOS)

Usage: smartsearch [directory to search] [directory to put found pictures] [keyword]

# How to install:
- Clone this repository
- cd to cloned directory
- Run npm link
- Get Clarifai API key, and put it in JSON format to ~/.config/smartsearch.json, like { "apiKey": "Xyz123" }
- Now you can search by typing smartsearch!