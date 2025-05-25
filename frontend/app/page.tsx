'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import ChoreBoard from '@/components/ChoreBoard';
import ChoreModal from '@/components/ChoreModal';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { ChoreReadDto, ChoreCreateDto, ChoreUpdateDto, ChoreStatus } from '@/src/types/chores';
import { useChores } from '@/src/hooks/useChores';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Main = styled.main`
  padding: 1.5rem;
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorContent = styled.div`
  max-width: 28rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: #374151;
  margin-bottom: 1rem;
`;

const ErrorList = styled.div`
  font-size: 0.875rem;
  color: #6b7280;

  p {
    margin-bottom: 0.5rem;
  }

  ul {
    list-style-type: disc;
    list-style-position: inside;
    margin-top: 0.5rem;
  }
`;

export default function Home() {
  const { chores, isLoading, error, createChore, updateChore, deleteChore, changeStatus } =
    useChores();

  const [statusFilter, setStatusFilter] = useState<ChoreStatus | 'todos'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChore, setEditingChore] = useState<ChoreReadDto | undefined>();

  const filteredChores = chores.filter((chore) =>
    statusFilter === 'todos' ? true : chore.status === statusFilter,
  );

  const handleCreateClick = () => {
    setEditingChore(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (chore: ChoreReadDto) => {
    setEditingChore(chore);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteChore(id);
    } catch (error) {
      console.error('Failed to delete chore:', error);
    }
  };

  const handleStatusChange = async (id: number, newStatus: ChoreStatus) => {
    try {
      await changeStatus(id, newStatus);
    } catch (error) {
      console.error('Failed to change chore status:', error);
    }
  };

  const handleModalSubmit = async (choreData: Omit<ChoreReadDto, 'id'>) => {
    try {
      if (editingChore) {
        const updateData: ChoreUpdateDto = {
          titulo: choreData.titulo,
          descricao: choreData.descricao,
          status: choreData.status,
          dataDeConclusao: choreData.dataDeConclusao,
        };
        await updateChore(editingChore.id, updateData);
      } else {
        const createData: ChoreCreateDto = {
          titulo: choreData.titulo,
          descricao: choreData.descricao,
          status: choreData.status,
        };
        await createChore(createData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save chore:', error);
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Carregando tarefas..." />;
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorContent>
          <ErrorTitle>Erro ao carregar tarefas</ErrorTitle>
          <ErrorMessage>{error.message}</ErrorMessage>
          <ErrorList>
            <p>Verifique se:</p>
            <ul>
              <li>O backend está rodando em http://localhost:5242</li>
              <li>O servidor está respondendo corretamente</li>
              <li>Não há problemas de CORS</li>
            </ul>
          </ErrorList>
        </ErrorContent>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Header
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateClick={handleCreateClick}
      />
      <Main>
        <ChoreBoard
          chores={filteredChores}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </Main>
      <ChoreModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        chore={editingChore}
      />
    </Container>
  );
}
