import { ActionExample } from "@elizaos/core";

export const aiSearchExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you perform a search for the latest AI advancements?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me perform an AI-powered search for the latest AI advancements.",
                action: "AI_SEARCH",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Find recent research papers on machine learning.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll search for recent research papers on machine learning.",
                action: "AI_SEARCH",
            },
        }
    ],
];

export const twitterLinksSearchExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you find Twitter links related to AI advancements?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me find some Twitter links related to AI advancements.",
                action: "TWITTER_LINKS_SEARCH",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Search for Twitter discussions on machine learning.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll search for Twitter discussions on machine learning.",
                action: "TWITTER_LINKS_SEARCH",
            },
        }
    ]
];

export const webLinksSearchExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you find web links related to AI advancements?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me find some web links related to AI advancements.",
                action: "WEB_LINKS_SEARCH",
                parameters: {
                    prompt: "AI advancements",
                    model: "NOVA"
                }
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Search for web articles on machine learning.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll search for web articles on machine learning.",
                action: "WEB_LINKS_SEARCH",
                parameters: {
                    prompt: "machine learning",
                    model: "NOVA"
                }
            },
        }
    ]
];

export const twitterSearchExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                query: "AI advancements",
                count: 10
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me find some tweets about AI advancements.",
                action: "TWITTER_SEARCH",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Search for tweets on machine learning.",
                query: "Elonmusk",
                count: 10
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll search for tweets on machine learning.",
                action: "TWITTER_SEARCH",
            },
        }
    ]
];

export const twitterUrlsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                urls: [
                    "https://twitter.com/user/status/1234567890",
                    "https://twitter.com/user/status/0987654321"
                ],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, let me fetch tweets from the provided URLs.",
                action: "TWITTER_BY_URLS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                urls: [
                    "https://twitter.com/user/status/1234567890",
                    "https://twitter.com/user/status/0987654321"
                ]
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll retrieve tweets from the specified links.",
                action: "TWITTER_BY_URLS",
            },
        }
    ]
];

export const twitterByIdExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                id: "5544332211",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure",
                action: "TWEET_BY_ID",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                id: "5544332211",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll tweet about the latest in machine learning.",
                action: "TWEET_BY_ID",
            },
        }
    ]
];

export const tweetByUserExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                user: "Elonmusk",
                query: '',
                count: 10
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "suer:",
                action: "TWEET_BY_USER",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                user: "Elonmusk",
                query: '',
                count: 10
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "suer: ",
                action: "TWEET_BY_USER",
            },
        }
    ]
];

export const webSearchExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                query: "Elonmusk",
                num: 10,
                start: 0
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure: ",
                action: "WEB_SEARCH",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                query: "Elonmusk",
                num: 10,
                start: 0
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "sure:",
                action: "WEB_SEARCH",
            },
        }
    ]
];

export const latestTweetExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                user: "Elonmusk",
                count: 10
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "suer:",
                action: "LATEST_TWEET",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                user: "Elonmusk",
                count: 10
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "suer: ",
                action: "LATEST_TWEET",
            },
        }
    ]
];

export const twitterUserExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                user: "Elonmusk",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "suer:",
                action: "TWITTER_USER",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                user: "nasa",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "suer: ",
                action: "TWITTER_USER",
            },
        }
    ]
];