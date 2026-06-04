#!/bin/bash
set -euo pipefail

echo "Generating API client from OpenAPI spec..."
yarn generate:api
echo "Done. Generated files are in generated/api/"
