import { Plugin } from "@elizaos/core";
import { AISearchAction } from './actions/AISearch'
import { TwitterLinksSearchAction } from './actions/twitterLinksSearch'
import { WebLinksSearchAction } from './actions/webLinksSearch'
import { TwitterSearchAction } from './actions/twitterSearch'
import { TwitterByUrlsAction } from './actions/tweetByUrls'
import { TweetByIdAction } from './actions/tweetById'
import { TweetByUserAction } from './actions/tweetByUser'
import { WebSearchAction } from './actions/webSearch'
import { LatestTweetAction } from './actions/latestTweets'

export const desearchPlugin: Plugin = {
    name: "desearch",
    description: "DESEARCH plugin for Eliza",
    actions: [
        AISearchAction, 
        TwitterLinksSearchAction, 
        WebLinksSearchAction, 
        TwitterSearchAction, 
        TwitterByUrlsAction, 
        TweetByIdAction, 
        TweetByUserAction,
        WebSearchAction,
        LatestTweetAction,
    ],
    evaluators: [],
    providers: [],
};
export default desearchPlugin;