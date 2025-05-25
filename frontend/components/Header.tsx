'use client';

import { ChoreReadDto } from '@/types/chore';
import styled from 'styled-components';
import Select from './ui/Select';
import Button from './ui/Button';

type StatusFilter = 'todos' | ChoreReadDto['status'];

interface HeaderProps {
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  onCreateClick: () => void;
}

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 1.5rem;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;

  span:first-child {
    color: #0f172a; // Chore
    font-weight: 700;
  }

  span:last-child {
    color: #3b82f6; // Board
    font-weight: 500;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Header = ({ statusFilter, onStatusFilterChange, onCreateClick }: HeaderProps) => {
  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'pendente', label: 'Pendente' },
    { value: 'emProgresso', label: 'Em Progresso' },
    { value: 'concluida', label: 'Concluída' },
  ];

  return (
    <HeaderContainer>
      <HeaderContent>
        <Title>
          <span>Chore</span>
          <span>Board</span>
        </Title>

        <Actions>
          <Select
            value={statusFilter}
            onChange={onStatusFilterChange}
            options={statusOptions}
            className="min-w-[120px]"
          />

          <Button onClick={onCreateClick}>Criar Tarefa</Button>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
