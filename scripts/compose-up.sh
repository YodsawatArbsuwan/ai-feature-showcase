#!/bin/bash
set -euo pipefail

ENV=${1:-local}
ACTION=${2:-up}

case "$ENV" in
  local)
    COMPOSE_FILE="docker-compose.dev.yml"
    ;;
  prod)
    COMPOSE_FILE="docker-compose.yml"
    ;;
  *)
    echo "Usage: $0 [local|prod] [up|down|logs|ps]"
    exit 1
    ;;
esac

case "$ACTION" in
  up)
    docker compose -f "$COMPOSE_FILE" up -d --build
    ;;
  down)
    docker compose -f "$COMPOSE_FILE" down
    ;;
  logs)
    docker compose -f "$COMPOSE_FILE" logs -f
    ;;
  ps)
    docker compose -f "$COMPOSE_FILE" ps
    ;;
  *)
    echo "Usage: $0 [local|prod] [up|down|logs|ps]"
    exit 1
    ;;
esac
