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
import { webSearchExamples } from '../examples/examples'


export const WebSearchAction: Action = {
    name: "WEB_SEARCH",
    similes: [],
    description: "This API allows users to search for any information over the web. This replicates a typical search engine experience, where users can search for any information they need.",
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

        const query = message.content.query as string;
        const num = message.content.num as number || 10;
        const start = message.content.start as number || 10;

        try {
            const result = await desearchServices.web_search({query, num, start});
            elizaLogger.success("Success Web search:");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error Web search:", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: webSearchExamples as ActionExample[][],
} as Action;