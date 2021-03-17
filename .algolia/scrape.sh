if [ -f .env ]; then
    export $(xargs < .env)
fi

docker run \
    -e APPLICATION_ID \
    -e API_KEY \
    -e CONFIG="$(cat config.json | jq '.start_urls=[env.ALGOLIA_SITE_URL]' | jq '.index_name=env.ALGOLIA_INDEX_NAME' | jq -r tostring)" \
    algolia/docsearch-scraper:v1.13.0