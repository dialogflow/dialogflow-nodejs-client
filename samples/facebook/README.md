# api-ai-facebook
Facebook bot sources for Api.ai integration

## Deploy with Heroku
Follow [these instructions](https://docs.api.ai/docs/facebook-integration#hosting-fb-messenger-bot-with-heroku).
Then,  
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Deploy with Docker

```bash
docker run -it --name fb_bot \
           -p <your_desired_port>:5000 \
           -e APIAI_ACCESS_TOKEN="API.AI client access token" \
           -e FB_PAGE_ACCESS_TOKEN="Facebook Page Access Token" \
           -e FB_VERIFY_TOKEN="Facebook Verify Token" \
           -e APIAI_LANG="en" \
           xvir/api-ai-facebook
```

## Note about languages:
When you deploy the app manually to Heroku, the APIAI_LANG not filled with a value.
You need to provide language parameter according to your agent settings in the form of two-letters code.
 
 * "en"
 * "ru"
 * "de"
 * "pt"
 * "pt-BR"
 * "es"
 * "fr"
 * "it"
 * "ja"
 * "ko"
 * "zh-CN"
 * "zh-HK"
 * "zh-TW"
