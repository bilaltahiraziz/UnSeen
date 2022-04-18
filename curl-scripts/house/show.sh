#!/bin/sh
# TOKEN="a31a93f861129b112d9868fe398c87cd"
# ID="6255b1cefece848ad81127a4"


API="http://localhost:4741"
URL_PATH="/houses"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
