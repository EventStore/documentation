if [ -f .env ]; then
    export $(xargs < .env)
fi

docker run \
    -e APPLICATION_ID=$(printenv ALGOLIA_APPLICATION_ID) \
    -e API_KEY=$(printenv ALGOLIA_WRITE_API_KEY) \
    -e CONFIG="$(cat config.json | sed 's,http://localhost:8080,'"$ALGOLIA_SITE_URL"',g' | jq '.index_name=env.ALGOLIA_INDEX_NAME' | jq -r tostring | sed 's/\\[r]//g')" \
    algolia/docsearch-scraper:v1.13.0