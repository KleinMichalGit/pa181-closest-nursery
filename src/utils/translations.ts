export async function fetchTranslations(language: string): Promise<any> {
  try {
    const response = await fetch(`/translations/${language}.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch translations");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching translations:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}
