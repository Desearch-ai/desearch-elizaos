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
import { aiSearchExamples } from '../examples/examples'
import { AISearchPayload } from '../types/types'


export const AISearchAction: Action = {
    name: "AI_SEARCH",
    similes: [],
    description: "Performs a search across multiple platforms",
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

        const prompt = _options.prompt as string || "Can you perform a search for the latest AI advancements?";
        const model = _options.model as AISearchPayload['model'] || "NOVA";
        const tools = _options.tools as AISearchPayload['tools'] || ["Web Search"];
        const date_filter = _options.date_filter as AISearchPayload["date_filter"] || 'PAST_24_HOURS';
        
        try {
            const result = await desearchServices.ai_search({ 
                prompt, 
                model, 
                tools,  
                date_filter 
            });
            elizaLogger.success("Success AI search:");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error AI search:", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: aiSearchExamples as ActionExample[][],
} as Action;