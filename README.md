# EPG API Challenge

## Requirements
- node 8

## Running Docker-Compose
``` bash
    # Change the file .env.example to .env
    mv .env.example .env

    # Create access log file
    mkdir ./tmp/logs && touch ./tmp/logs/access.log

    # Run API
    docker-compose up
```
