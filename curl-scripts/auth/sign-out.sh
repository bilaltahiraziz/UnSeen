#!/bin/bash

# TOKEN="a31a93f861129b112d9868fe398c87cd"

API="http://localhost:4741"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
