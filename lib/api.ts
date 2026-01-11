import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
});

export const getCampers = async () => {
  try {
    const response = await apiClient.get("/campers");
    return response.data;
  } catch (error) {
    console.error("Error fetching campers:", error);
    throw error;
  }
};

export const getCamperById = async (id: string) => {
  try {
    const response = await apiClient.get(`/campers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching camper with id ${id}:`, error);
    throw error;
  }
};
