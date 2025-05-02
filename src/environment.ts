import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const desearchEnvSchema = z.object({
    DESEARCH_API_KEY: z.string().min(1, "Desearch API key is required"),
});

export type desearchConfig = z.infer<typeof desearchEnvSchema>;

export async function validateDesearchConfig(
    runtime: IAgentRuntime
): Promise<desearchConfig> {
    try {
        const config = {
            DESEARCH_API_KEY: runtime.getSetting("DESEARCH_API_KEY"),
        };
        console.log('config: ', config)
        return desearchEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error)
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Desearch API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}