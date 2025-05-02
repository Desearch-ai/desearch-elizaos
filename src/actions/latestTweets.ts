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
import { latestTweetExamples } from '../examples/examples'


export const LatestTweetAction: Action = {
    name: "LATEST_TWEET",
    similes: [],
    description: "The X Latest Posts Search by User API enables users to retrieve relevant links or tweets based on specified search queries without utilizing AI-powered models. It analyzes and extracts links from X posts that match the given search criteria.",
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
        const count = message.content.count as number || 10;

        try {
            const result = await desearchServices.latest_tweets({user, count});
            elizaLogger.success("Success Latest Tweets");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error Latest Tweets", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: latestTweetExamples as ActionExample[][],
} as Action;