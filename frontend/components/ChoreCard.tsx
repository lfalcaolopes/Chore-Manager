'use client';

import { ChoreReadDto, ChoreStatus } from '@/src/types/chores';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styled from 'styled-components';
import Select from './ui/Select';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface ChoreCardProps {
  chore: ChoreReadDto;
  onEdit: (chore: ChoreReadDto) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: ChoreStatus) => void;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  padding: 1rem;
  transition: box-shadow 0.2s ease;
  min-height: 220px;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
`;

const Description = styled.p`
  color: #4b5563;
  white-space: pre-wrap;
  min-height: 1rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Dates = styled.div`
  font-size: 0.875rem;
  color: #6b7280;

  p {
    margin: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.25rem;
`;

const StatusWrapper = styled.div`
  flex: 1;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ChoreCard = ({ chore, onEdit, onDelete, onStatusChange }: ChoreCardProps) => {
  const statusOptions = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'EmProgresso', label: 'Em Progresso' },
    { value: 'Concluida', label: 'Concluída' },
  ];

  const handleStatusChange = (value: string) => {
    onStatusChange(chore.id, value as ChoreStatus);
  };

  return (
    <Card>
      <Content>
        <Title>{chore.titulo}</Title>
        <Description>{chore.descricao || '\u00A0'}</Description>
        <Dates>
          <p>Criado em: {format(new Date(chore.dataDeCriacao), 'dd/MM/yyyy', { locale: ptBR })}</p>
          {chore.dataDeConclusao && (
            <p>
              Concluído em:{' '}
              {format(new Date(chore.dataDeConclusao), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
            </p>
          )}
        </Dates>
      </Content>

      <Footer>
        <StatusWrapper>
          <Select value={chore.status} onChange={handleStatusChange} options={statusOptions} />
        </StatusWrapper>
        <Actions>
          <IconButton size="small" onClick={() => onEdit(chore)} aria-label="Editar tarefa">
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(chore.id)} aria-label="Excluir tarefa">
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Actions>
      </Footer>
    </Card>
  );
};

export default ChoreCard;
