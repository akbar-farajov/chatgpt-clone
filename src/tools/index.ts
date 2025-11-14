import { ToolSet } from "ai";
import { getWeather } from "./get-weather";
import { imageGeneration } from "./generate-image";

export const getTools = () =>
  ({
    getWeather,
    imageGeneration,
  } satisfies ToolSet);
