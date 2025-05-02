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
import { twitterSearchExamples } from '../examples/examples'
import { TwitterSearchPayload } from '../types/types'


export const TwitterSearchAction: Action = {
    name: "TWITTER_SEARCH",
    similes: [],
    description: "The X Search API enables users to retrieve relevant links and tweets based on specified search queries without utilizing AI-driven models. It analyzes links from X posts that align with the provided search criteria.",
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

        const twitterSearchPayload = message.content as TwitterSearchPayload;

        try {
            const result = await desearchServices.twitter_search(twitterSearchPayload);
            elizaLogger.success("Success Twitter search:");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error Twitter search:", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: twitterSearchExamples as ActionExample[][],
} as Action;