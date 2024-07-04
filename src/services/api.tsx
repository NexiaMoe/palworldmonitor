import wretch from "wretch";

// API Service for calling Palworld endpoint

// Interface for Server Info

// API Service for calling Palworld endpoint
export async function getServerInfo(IP: string): Promise<ServerInfo> {
    try {
        const response = await wretch(`${IP}/v1/api/info`).get().json<ServerInfo>();
        return response;
    } catch (error) {
        console.error("Error fetching server info:", error);
        throw error;
    }
}


// 