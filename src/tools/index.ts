import { ToolSet } from "ai";
import { getWeather } from "./get-weather";

export const getTools = () =>
  ({
    getWeather,
  } satisfies ToolSet);
