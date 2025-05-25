import { useState, useEffect, useCallback } from 'react';
import { ChoreReadDto, ChoreCreateDto, ChoreUpdateDto, ChoreStatus } from '../types/chores';
import * as choresService from '../services/chores';

export function useChores() {
  const [chores, setChores] = useState<ChoreReadDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load all chores
  const fetchChores = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await choresService.getAllChores();
      setChores(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch chores'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new chore
  const createChore = useCallback(
    async (data: ChoreCreateDto) => {
      try {
        setIsLoading(true);
        setError(null);
        await choresService.createChore(data);
        await fetchChores(); // Fetch all chores after creating
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to create chore'));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchChores],
  );

  // Update existing chore
  const updateChore = useCallback(
    async (id: number, data: ChoreUpdateDto) => {
      try {
        setIsLoading(true);
        setError(null);
        await choresService.updateChore(id, data);
        await fetchChores(); // Fetch all chores after updating
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to update chore'));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchChores],
  );

  // Delete chore
  const deleteChore = useCallback(
    async (id: number) => {
      try {
        setIsLoading(true);
        setError(null);
        await choresService.deleteChore(id);
        await fetchChores(); // Fetch all chores after deleting
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to delete chore'));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchChores],
  );

  // Change chore status
  const changeStatus = useCallback(
    async (id: number, status: ChoreStatus) => {
      try {
        setIsLoading(true);
        setError(null);
        const chore = chores.find((c) => c.id === id);
        if (!chore) {
          throw new Error('Chore not found');
        }

        await choresService.updateChore(id, {
          titulo: chore.titulo, // Include required fields
          descricao: chore.descricao,
          status,
          dataDeConclusao: status === 'Concluida' ? new Date().toISOString() : null,
        });
        await fetchChores(); // Fetch all chores after changing status
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to change chore status'));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [chores, fetchChores],
  );

  // Load chores on mount
  useEffect(() => {
    fetchChores();
  }, [fetchChores]);

  return {
    chores,
    isLoading,
    error,
    fetchChores,
    createChore,
    updateChore,
    deleteChore,
    changeStatus,
  };
}
