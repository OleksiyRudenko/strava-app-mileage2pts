#!/bin/bash
set -a && source .env && set +a

# Create subscription
# verify_token
#   String chosen by the application owner for client security.
#   An identical string will be included in the validation request made by Strava's subscription service.
curl -X POST https://www.strava.com/api/v3/push_subscriptions \
      -F client_id=$STRAVA_CLIENT_ID \
      -F client_secret=$STRAVA_CLIENT_SECRET \
      -F callback_url=$STRAVA_EVENTS_CALLBACK_URL \
      -F verify_token=$STRAVA_VERIFY_TOKEN

# Validate subscription
# hub.verify_token
#   This will be set to whatever verify_token is passed in with the initial subscription request,
#   and it enables application owners to know that they are receiving the correct response from Strava's subscription service.
# hub.challenge
#   Random string the callback address must echo back to verify its existence.
# See also https://developers.strava.com/docs/webhooks/#subscription-validation-request
curl GET https://mycallbackurl.com?hub.verify_token=$STRAVA_VERIFY_TOKEN&hub.challenge=$STRAVA_ONE_TIME_VALIDATION_KEY&hub.mode=subscribe

# View a subscription
curl -G https://www.strava.com/api/v3/push_subscriptions \
    -d client_id=$STRAVA_CLIENT_ID \
    -d client_secret=$STRAVA_CLIENT_SECRET

# Delete subscription
# $STRAVA_SUBSCRIPTION_ID
#   Push subscription ID
curl -X DELETE "https://www.strava.com/api/v3/push_subscriptions/$STRAVA_SUBSCRIPTION_ID?client_id=$STRAVA_CLIENT_ID&client_secret=$STRAVA_CLIENT_SECRET"
