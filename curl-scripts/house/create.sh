#!/bin/bash

# TOKEN="41e07881b6e3fdcadcb4b2138d14372c"
# ADDRESS="1234 Street St. Fenton, MO 63026"
# SIZE="2000"
# STRUCTURE="Main Level with Basement"
# OWNER="6255a01dfece848ad811279a"

# TOKEN="a31a93f861129b112d9868fe398c87cd"
# ADDRESS="5678 Alley Dr. Chicago, IL 60680"
# SIZE="1000"
# STRUCTURE="Main Level"
# OWNER="6255a01dfece848ad811279a"

API="http://localhost:4741"
URL_PATH="/houses"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "house": {
      "address": "'"${ADDRESS}"'",
      "size": "'"${SIZE}"'",
      "structure": "'"${STRUCTURE}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo
