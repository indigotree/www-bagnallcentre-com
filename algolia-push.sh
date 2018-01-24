curl -X POST \
    -H "X-Algolia-API-Key: ${ALGOLIA_API_KEY}" \
    -H "X-Algolia-Application-Id: ${ALGOLIA_APPLICATION_ID}" \
    --data-binary @public/index.algolia.json \
    "https://${ALGOLIA_APPLICATION_ID}.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/batch"