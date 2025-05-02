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
import { twitterByIdExamples } from '../examples/examples'


export const TweetByIdAction: Action = {
    name: "TWEET_BY_ID",
    similes: [],
    description: "Retrieve comprehensive details of a post by specifying its unique ID. This endpoint provides metadata, content, and engagement metrics associated with the specified post.",
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

        const id = message.content.id as string;

        try {
            const result = await desearchServices.tweets_by_id(id);
            elizaLogger.success("Success Twitter by id");
            if (callback) {
                callback({
                    text: ``,
                    content: { result },
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error Twitter by id", error);
            callback({
                text: `Error: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: twitterByIdExamples as ActionExample[][],
} as Action;