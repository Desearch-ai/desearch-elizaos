import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateDesearchConfig } from "../environment";
import { DesearchServices } from '../services/desearchServices'
import { tweetByUserExamples } from '../examples/examples'


export const TweetByUserAction: Action = {
    name: "TWEET_BY_USER",
    similes: [],
    description: "The X posts search by user API allows users to search for relevant links or tweets based on X search queries without leveraging AI-powered models. This API analyze links from X posts that match the given prompt.",
    validate: async (runtime: IAgentRuntime) => {
        await validateDesearchConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {

        const config = await validateDesearchConfig(runtime);
        const desearchServices = new DesearchServices(config.DESEARCH_API_KEY);

        const user = message.content.user as string;
        const query = message.content.query as string || "";
        const count = message.content.count as number || 10;

        try {
            const result = await desearchServices.tweets_by_user({user, query, count});
            elizaLogger.success("Success Twitter by user");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error Twitter by user", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: tweetByUserExamples as ActionExample[][],
} as Action;