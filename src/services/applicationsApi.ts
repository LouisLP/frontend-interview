import { Application } from "../types/Application";

const API_URL = "http://localhost:3001/api/applications";

export const applicationsApi = {
  getApplications: async (
    page: number,
    limit: number
  ): Promise<{
    data: Application[];
    hasMore: boolean;
  }> => {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const linkHeader = response.headers.get("Link");
    const hasMore = linkHeader?.includes('rel="next"') ?? false;

    return { data, hasMore };
  },
};
