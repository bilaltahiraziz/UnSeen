#!/bin/bash
# TOKEN="a31a93f861129b112d9868fe398c87cd"
# ID="6255b1cefece848ad81127a4"
# ADDRESS="6800 Alley Dr. Chicago, IL 60680"
# SIZE="1500"
# STRUCTURE="Main with Addition"


API="http://localhost:4741"
URL_PATH="/houses"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "house": {
      "address": "'"${ADDRESS}"'",
      "size": "'"${SIZE}"'",
      "structure": "'"${STRUCTURE}"'"
    }
  }'
echo
