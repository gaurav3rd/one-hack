class ApiProvider {
  private baseUrl = 'http://localhost:9000/api/';  // Hardcoded base URL

  // GET request method
  async get<T>(endpoint: string, body?: any): Promise<T> {
    try {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        // For GET, body might not be standard, but we can pass it as query parameters
        const queryParams = new URLSearchParams(body).toString();
        endpoint = `${endpoint}?${queryParams}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  // POST request method
  async post<T>(endpoint: string, body: any): Promise<T> {
    try {
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // The body is converted to a JSON string
      };

      const response = await fetch(`${this.baseUrl}${endpoint}`, options);
      if (!response.ok) {
        throw new Error('Failed to post data');
      }
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
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