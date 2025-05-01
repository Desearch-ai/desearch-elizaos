/**
 * @typedef {Object} AISearchPayload
 * @property {string} prompt - The prompt for the search.
 * @property {Array<'Web Search' | 'Hacker News Search' | 'Reddit Search' | 'Wikipedia Search' | 'Youtube Search' | 'Twitter Search' | 'ArXiv Search'>} tools - The tools to be used in the search.
 * @property {'NOVA' | 'ORBIT' | 'HORIZON'} model - The model to be used for the search.
 * @property {'PAST_24_HOURS' | 'PAST_2_DAYS' | 'PAST_WEEK' | 'PAST_2_WEEKS' | 'PAST_MONTH' | 'PAST_2_MONTHS' | 'PAST_YEAR' | 'PAST_2_YEARS'} [date_filter] - The date filter to apply to the search.
 * @property {boolean} streaming - Whether the search should be streamed.
 */
export interface AISearchPayload {
    prompt: string;
    tools: Array<'Web Search' | 'Hacker News Search' | 'Reddit Search' | 'Wikipedia Search' | 'Youtube Search' | 'Twitter Search' | 'ArXiv Search'>;
    model: 'NOVA' | 'ORBIT' | 'HORIZON';
    date_filter?: 'PAST_24_HOURS' | 'PAST_2_DAYS' | 'PAST_WEEK' | 'PAST_2_WEEKS' | 'PAST_MONTH' | 'PAST_2_MONTHS' | 'PAST_YEAR' | 'PAST_2_YEARS';
    streaming: boolean;
    system_message?: string;
    result_type?: 'ONLY_LINKS' | 'LINKS_WITH_SUMMARIES' | 'LINKS_WITH_FINAL_SUMMARY';
  }
  
  /**
   * @typedef {Object} XLinksSearchPayload
   * @property {string} prompt - The prompt for the search.
   * @property {'NOVA' | 'ORBIT' | 'HORIZON'} [model] - The model to be used for the search.
   */
export interface XLinksSearchPayload {
    prompt: string;
    model?: 'NOVA' | 'ORBIT' | 'HORIZON';
  }
  
  /**
   * @typedef {Object} WebLinksSearchPayload
   * @property {string} prompt - The prompt for the search.
   * @property {Array<'Web Search' | 'Hacker News Search' | 'Reddit Search' | 'Wikipedia Search' | 'Youtube Search' | 'Twitter Search' | 'ArXiv Search'>} tools - The tools to be used in the search.
   * @property {'NOVA' | 'ORBIT' | 'HORIZON'} [model] - The model to be used for the search.
   */
export interface WebLinksSearchPayload {
    prompt: string;
    tools: Array<'Web Search' | 'Hacker News Search' | 'Reddit Search' | 'Wikipedia Search' | 'Youtube Search' | 'Twitter Search' | 'ArXiv Search'>;
    model: 'NOVA' | 'ORBIT' | 'HORIZON';
  }
  
  /**
   * @typedef {Object} XSearchPayload
   * @property {string} query - The search query string.
   * @property {"Top" | "Latest"} [sort] - Sort order of the search results.
   * @property {string} [user] - Specific user to search tweets from.
   * @property {string} [start_date] - Start date for the search.
   * @property {string} [end_date] - End date for the search.
   * @property {string} [lang] - Language of the tweets.
   * @property {boolean} [verified] - Whether to include only verified users.
   * @property {boolean} [blue_verified] - Whether to include only blue verified users.
   * @property {boolean} [is_quote] - Whether to include only quote tweets.
   * @property {boolean} [is_video] - Whether to include only tweets with videos.
   * @property {boolean} [is_image] - Whether to include only tweets with images.
   * @property {number | string} [min_retweets] - Minimum number of retweets.
   * @property {number | string} [min_replies] - Minimum number of replies.
   * @property {number | string} [min_likes] - Minimum number of likes.
   */
export interface XSearchPayload {
    query: string;
    sort?: "Top" | "Latest";
    user?: string;
    start_date?: string;
    end_date?: string;
    lang?: string;
    verified?: boolean;
    blue_verified?: boolean;
    is_quote?: boolean;
    is_video?: boolean;
    is_image?: boolean;
    min_retweets?: number | string;
    min_replies?: number | string;
    min_likes?: number | string;
    count?: number;
  }
  
  /**
   * @typedef {Object} WebSearchPayload
   * @property {string} query - The search query string.
   * @property {number} num - The number of search results to return.
   * @property {number} start - The starting index for the search results.
   */
 export interface WebSearchPayload {
    query: string;
    num: number;
    start: number;
  }
  
  
  /**
   * @typedef {Object} TweetsByUserPayload
   * @property {string} user - The username of the user to search tweets from.
   * @property {string} [query] - The search query string.
   * @property {number} [count] - The number of tweets to return.
   */
 export interface TweetsByUserPayload {
    user: string;
    query?: string;
    count?: number;
  }
  
  /**
   * @typedef {Object} LatestTweetsPayload
   * @property {string} user - The username of the user to search tweets from.
   * @property {number} count - The number of tweets to return.
   */
 export interface LatestTweetsPayload {
    user: string;
    count: number;
  }
  
  /**
   * @typedef {Object} TweetsAndRepliesPayload
   * @property {string} user - The username of the user to search tweets from.
   * @property {number} [count] - The number of tweets to return.
   * @property {string} [query] - The search query string.
   */
 export interface TweetsAndRepliesPayload {
    user: string;
    count?: number;
    query?: string;
  }
  
  /**
   * @typedef {Object} RepliesForPostPayload
   * @property {string} post_id - The ID of the post to search replies for.
   * @property {number} [count] - The number of replies to return.
   * @property {string} [query] - The search query string.
   */
 export interface RepliesForPostPayload {
    post_id: string;
    count?: number;
    query?: string;
  }
  
  /**
   * @typedef {Object} RetweetsByPostPayload
   * @property {string} post_id - The ID of the post to search retweets for.
   * @property {number} [count] - The number of retweets to return.
   * @property {string} [query] - The search query string.
   */
 export interface RetweetsByPostPayload {
    post_id: string;
    count?: number;
    query?: string;
  }
  
export  interface TwitterUserPayload {
    user: string;
  }
  