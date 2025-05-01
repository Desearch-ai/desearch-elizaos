// src/actions/search.ts
import {
    Action,
    composeContext,
    elizaLogger,
    generateObjectDeprecated,
    type HandlerCallback,
    ModelClass,
    type IAgentRuntime,
    type Memory,
    type State,
  } from "@elizaos/core";
  import { 
    AISearchPayload, 
    LatestTweetsPayload, 
    RepliesForPostPayload, 
    RetweetsByPostPayload, 
    TweetsAndRepliesPayload, 
    TweetsByUserPayload,
    TwitterUserPayload,
    WebLinksSearchPayload,
    WebSearchPayload,
    XLinksSearchPayload,
    XSearchPayload
  } from '../types/desearchTypes';
  
  
  
  const base_url: string = "https://api.desearch.ai";
  
  // ... existing code ...
  
  export class DesearchActions {
    constructor() {}
  
    /**
     * Handles HTTP requests for search actions.
     * @param {string} endpoint - The API endpoint to send the request to.
     * @param {string} method - The HTTP method to use (e.g., "POST", "GET").
     * @param {object} payload - The payload to send with the request.
     * @returns {Promise<any>} - The result of the API call.
     * @throws Will throw an error if the request fails.
     */
    private async requestHandler(endpoint: string, method: string, payload: object | string[] | string): Promise<any> {
      try {
        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `API_KEY`,
          },
          body: method === "POST" ? JSON.stringify(payload) : undefined,
        };
  
        const url = method === "GET" ? `${base_url}${endpoint}?${new URLSearchParams(payload as any).toString()}` : `${base_url}${endpoint}`;
        const response = await fetch(url, options);
  
        if (!response.ok) {
          elizaLogger.error(`Failed to fetch: ${response.statusText}`);
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
  
        return await response.json();
      } catch (error) {
        elizaLogger.error(`Error in requestHandler: ${error.message}`);
        throw error;
      }
    }
  
    /**
     * Performs an AI search using the specified payload.
     * @param {AISearchPayload} payload - The payload for the AI search.
     * @returns {Promise<any>} - The result of the AI search.
     */
    async ai_search(payload: AISearchPayload): Promise<any> {
      return this.requestHandler("/desearch/ai/search", "POST", { payload, streaming: false });
    }
  
    /**
     * Performs an X links search using the specified payload.
     * @param {XLinksSearchPayload} payload - The payload for the X links search.
     * @returns {Promise<any>} - The result of the X links search.
     */
    async twitter_links_search(payload: XLinksSearchPayload): Promise<any> {
      return this.requestHandler("/desearch/ai/search/links/twitter", "POST", payload);
    }
  
    /**
     * Performs a web links search using the specified payload.
     * @param {WebLinksSearchPayload} payload - The payload for the web links search.
     * @returns {Promise<any>} - The result of the web links search.
     */
    async web_links_search(payload: WebLinksSearchPayload): Promise<any> {
      return this.requestHandler("/desearch/ai/search/links/web", "POST", payload);
    }
  
    /**
     * Performs an X search using the specified payload.
     * @param {XSearchPayload} payload - The payload for the X search.
     * @returns {Promise<any>} - The result of the X search.
     */
    async twitter_search(payload: XSearchPayload): Promise<any> {
      return this.requestHandler("/twitter", "GET", payload);
    }
  
    /**
     * Performs a web search using the specified payload.
     * @param {WebSearchPayload} payload - The payload for the web search.
     * @returns {Promise<any>} - The result of the web search.
     */
    async web_search(payload: WebSearchPayload): Promise<any> {
      return this.requestHandler("/web", "GET", payload);
    }
  
  
    /**
     * Fetches tweets from specified URLs.
     * @param {string[]} payload - An array of URLs to retrieve tweets from.
     * @returns {Promise<any>} - The result of the request to fetch tweets.
     */
  
    async tweets_by_urls(payload: string[]): Promise<any> {
      return this.requestHandler("/twitter/urls", "GET", payload);
    }
  
  /**
   * Fetches a tweet by its ID.
   * @param {string} id - The ID of the tweet to fetch.
   * @returns {Promise<any>} - The result of the request to fetch the tweet.
   */
  
  
    async tweets_by_id(id: string): Promise<any> {
      return this.requestHandler("/twitter/post", "GET", id);
    }
  
    /**
     * Fetches tweets from specified users.
     * @param {TweetsByUserPayload} payload - The payload for the tweets by user request.
     * @returns {Promise<any>} - The result of the request to fetch tweets.
     */
    async tweets_by_user(payload: TweetsByUserPayload): Promise<any> {
      return this.requestHandler("/twitter/post/user", "GET", payload);
    }
  
    /**
     * Fetches the latest tweets from the specified user.
     * @param {LatestTweetsPayload} payload - The payload for the latest tweets request.
     * @returns {Promise<any>} - The result of the request to fetch the latest tweets.
     */
    async latest_tweets(payload: LatestTweetsPayload): Promise<any> {
      return this.requestHandler("/twitter/latest", "GET", payload);
    }
  
    /**
     * Fetches tweets and replies from the specified user.
     * @param {TweetsAndRepliesPayload} payload - The payload for the tweets and replies by user request.
     * @returns {Promise<any>} - The result of the request to fetch the tweets and replies.
     */
  
    /**
     * Fetches tweets and replies from the specified user.
     * @param {TweetsAndRepliesPayload} payload - The payload for the tweets and replies by user request.
     * @returns {Promise<any>} - The result of the request to fetch the tweets and replies.
     */
    async tweets_and_replies_by_user(payload: TweetsAndRepliesPayload) {
      return this.requestHandler("/twitter/replies", "GET", payload);
    }
  
    /**
     * Fetches replies for a specified post.
     * @param {RepliesForPostPayload} payload - The payload containing the post ID and additional query options.
     * @returns {Promise<any>} - The result of the request to fetch replies.
     */
    async replies_for_post(payload: RepliesForPostPayload) {
      return this.requestHandler("/twitter/replies/post", "GET", payload);
    }
  
  /**
   * Fetches retweets for a specified post.
   * @param {RetweetsByPostPayload} payload - The payload containing the post ID and additional query options.
   * @returns {Promise<any>} - The result of the request to fetch retweets.
   */
  
    async retweets_by_post(payload: RetweetsByPostPayload) {
      return this.requestHandler("/twitter/replies/post", "GET", payload);
    }
  
    /**
     * Fetches information about a Twitter user.
     * @param {TwitterUserPayload} payload - The payload containing the username of the Twitter user.
     * @returns {Promise<any>} - The result of the request to fetch the user's information.
     */
  
    async twitter_user(payload: TwitterUserPayload) {
      return this.requestHandler("/twitter/user", "GET", payload);
    }
  }
  
  // ... existing code ...
  export const desearchActions: Action = {
    name: "AI_SEARCH",
    similes: [],
    description: "",
    examples: [],
    validate: async () => true,
    handler: async (
      runtime: IAgentRuntime,
      message: Memory,
      state: State | undefined,
      _options: Record<string, unknown> = {}, // Provide a default value
      callback?: HandlerCallback
    ) => {
      elizaLogger.debug("Executing AI_SEARCH action");
  
      const action = new DesearchActions();
  
      try {
        const ai_search = await action.ai_search({
          // TODO need to add options
        });
        if (callback) {
          callback({
            text: ai_search.text,
            content: { ...ai_search },
          })
        }
          return true;
        } catch (error) {
            elizaLogger.error("Error during AI_SEARCH action:", error);
            
            callback?.({
                text: error.message,
            });
            return false;
        }
    },
  };