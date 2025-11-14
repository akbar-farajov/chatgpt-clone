import { tool } from "ai";
import { z } from "zod";

export const getWeather = tool({
  description: "Get the weather for a given location",
  inputSchema: z.object({
    location: z.string(),
  }),
  execute: async ({ location }) => {
    if (location === "New York") {
      return " New York is sunny";
    } else if (location === "London") {
      return "London is cloudy";
    } else {
      return "I don't know the weather for that location";
    }
  },
});
