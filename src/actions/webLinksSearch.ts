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
import { webLinksSearchExamples } from '../examples/examples'
import { WebLinksSearchPayload } from '../types/types'


export const WebLinksSearchAction: Action = {
    name: "WEB_LINKS_SEARCH",
    similes: [],
    description: "This API allows users to search for links related to a given query (prompt) using multiple tools, excluding X (Twitter) Search. The API returns a list of relevant sources from selected platforms such as web pages, YouTube, Wikipedia, and ArXiv.",
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
        const model = _options.model as WebLinksSearchPayload['model'] || "NOVA";
        const tools = _options.tools as WebLinksSearchPayload['tools'] || ["Web Search"];

        try {
            const result = await desearchServices.web_links_search({ 
                prompt, 
                model,
                tools,
            });
            elizaLogger.success("Success Web links search:");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error Web links search:", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: webLinksSearchExamples as ActionExample[][],
} as Action;