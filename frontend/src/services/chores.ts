import { ChoreReadDto, ChoreCreateDto, ChoreUpdateDto } from '../types/chores';

const BASE_URL = 'http://localhost:5242';
const CHORES_ENDPOINT = '/Chores';

// Helper function to handle API errors
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
  }

  // Check if the response is empty
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Error parsing JSON response:', text, error);
    throw new Error('Invalid JSON response from server');
  }
}

// List all chores
export async function getAllChores(): Promise<ChoreReadDto[]> {
  try {
    console.log('Fetching chores from:', `${BASE_URL}${CHORES_ENDPOINT}`);
    const response = await fetch(`${BASE_URL}${CHORES_ENDPOINT}`);
    return handleApiResponse<ChoreReadDto[]>(response);
  } catch (error) {
    console.error('Error fetching chores:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5242',
      );
    }
    throw error;
  }
}

// Get a specific chore by ID
export async function getChore(id: number): Promise<ChoreReadDto> {
  try {
    const response = await fetch(`${BASE_URL}${CHORES_ENDPOINT}/${id}`);
    return handleApiResponse<ChoreReadDto>(response);
  } catch (error) {
    console.error(`Error fetching chore ${id}:`, error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5242',
      );
    }
    throw error;
  }
}

// Create a new chore
export async function createChore(data: ChoreCreateDto): Promise<ChoreReadDto> {
  try {
    console.log('Creating chore with data:', data);
    const response = await fetch(`${BASE_URL}${CHORES_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse<ChoreReadDto>(response);
  } catch (error) {
    console.error('Error creating chore:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5242',
      );
    }
    throw error;
  }
}

// Update an existing chore
export async function updateChore(id: number, data: ChoreUpdateDto): Promise<ChoreReadDto> {
  try {
    console.log(`Updating chore ${id} with data:`, data);
    const response = await fetch(`${BASE_URL}${CHORES_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleApiResponse<ChoreReadDto>(response);
  } catch (error) {
    console.error(`Error updating chore ${id}:`, error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5242',
      );
    }
    throw error;
  }
}

// Delete a chore
export async function deleteChore(id: number): Promise<void> {
  try {
    console.log(`Deleting chore ${id}`);
    const response = await fetch(`${BASE_URL}${CHORES_ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
    }
  } catch (error) {
    console.error(`Error deleting chore ${id}:`, error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5242',
      );
    }
    throw error;
  }
}
