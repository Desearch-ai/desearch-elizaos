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
import { twitterLinksSearchExamples } from '../examples/examples'
import { TwitterLinksSearchPayload } from '../types/types'


export const TwitterLinksSearchAction: Action = {
    name: "TWITTER_LINKS_SEARCH",
    similes: [],
    description: "The Х Posts Search API allows users to search for relevant links based on Х search queries with leveraging AI-powered models. This API analyze links from Х posts that match the given prompt. This API is useful for tracking trends, gathering insights, and retrieving real-time information from Х.",
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

        const prompt = _options.prompt as string || "What are the recent sport events?";
        const model = _options.model as TwitterLinksSearchPayload['model'] || "NOVA";

        try {
            const result = await desearchServices.twitter_links_search({ 
                prompt, 
                model,
            });
            elizaLogger.success("Success Twitter links search:");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error Twitter links search:", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: twitterLinksSearchExamples as ActionExample[][],
} as Action;