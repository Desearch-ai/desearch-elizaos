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
import { twitterUserExamples } from '../examples/examples'


export const TweeterUserAction: Action = {
    name: "TWITTER_USER",
    similes: [],
    description: "This endpoint allows users to retrieve detailed information about an X (Twitter) user by providing their username. The response includes user metadata such as display name, profile details, follower count, and other relevant information.",
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

        try {
            const result = await desearchServices.twitter_user({user});
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

    examples: twitterUserExamples as ActionExample[][],
} as Action;