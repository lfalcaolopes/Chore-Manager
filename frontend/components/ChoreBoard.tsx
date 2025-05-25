'use client';

import { ChoreReadDto } from '@/types/chore';
import styled from 'styled-components';
import ChoreCard from './ChoreCard';

interface ChoreBoardProps {
  chores: ChoreReadDto[];
  onEdit: (chore: ChoreReadDto) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: ChoreReadDto['status']) => void;
}

const Board = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  min-height: 0;
  background: #f9fafb;
`;

const Column = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const ColumnTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;

  span {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

const CardList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  max-height: calc(100vh - 12rem);
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const ChoreBoard = ({ chores, onEdit, onDelete, onStatusChange }: ChoreBoardProps) => {
  const columns = [
    { status: 'pendente' as const, title: 'Pendente' },
    { status: 'emProgresso' as const, title: 'Em Progresso' },
    { status: 'concluida' as const, title: 'Concluída' },
  ];

  return (
    <Board>
      {columns.map((column) => (
        <Column key={column.status}>
          <ColumnHeader>
            <ColumnTitle>
              {column.title}
              <span>({chores.filter((chore) => chore.status === column.status).length})</span>
            </ColumnTitle>
          </ColumnHeader>
          <CardList>
            {chores
              .filter((chore) => chore.status === column.status)
              .map((chore) => (
                <ChoreCard
                  key={chore.id}
                  chore={chore}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
          </CardList>
        </Column>
      ))}
    </Board>
  );
};

export default ChoreBoard;
