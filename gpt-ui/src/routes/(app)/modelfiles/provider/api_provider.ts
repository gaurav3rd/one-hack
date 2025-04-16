class ApiProvider {
  private baseUrl = 'http://localhost:9000/api/';  // Hardcoded base URL

  // GET request method
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }
}

export default ApiProvider;

const oneHackGetSuggestions = async () => {
  try {
    const data = await ApiProvider().get('/lookup');
    return data; // returns the json response
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error; // rethrow if needed
  }
};

const oneHackGetGeneratedForm = async () => {
  try {
    const data = await ApiProvider().post('/lookup');
    return data; // returns the json response
  } catch (error) {
    console.error('Error fetching generated form:', error);
    throw error; // rethrow if needed
  }
};