import logger from "../../config/logger.config";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export function sanitize(markdown: string): string {
    if (!markdown || typeof markdown !== "string") return "";

    try {
        const convertedHtml = marked.parse(markdown, { async: false }) as string;
        return convertedHtml;
    } catch (err) {
        logger.error("Error sanitizing markdown:", err);
        return "";
    }
}