#!/bin/sh
# TOKEN="a31a93f861129b112d9868fe398c87cd"
API="http://localhost:4741"
URL_PATH="/houses"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
