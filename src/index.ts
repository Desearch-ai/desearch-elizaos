import { Plugin } from 'elizaos-core';

const desearchPlugin: Plugin = {
  name: "desearch",
  description: "Search with desearch.ai API",
  async initialize(runtime) {
    const apiKey = runtime.getSetting("DESEARCH_API_KEY");
    // Initialize your API client here
  },
  actions: [], 
  clients: [],
  adapters: [], 
};

export default desearchPlugin;