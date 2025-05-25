'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChoreReadDto } from '@/types/chore';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

interface ChoreModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (chore: Omit<ChoreReadDto, 'id'>) => void;
  chore?: ChoreReadDto;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChoreModal = ({ open, onClose, onSubmit, chore }: ChoreModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ChoreReadDto['status']>('pendente');
  const [completionDate, setCompletionDate] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (chore) {
      setTitle(chore.title);
      setDescription(chore.description);
      setStatus(chore.status);
      setCompletionDate(chore.completionDate || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pendente');
      setCompletionDate('');
    }
    setErrors({});
  }, [chore, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'O título é obrigatório';
    if (!description.trim()) newErrors.description = 'A descrição é obrigatória';
    if (status === 'concluida' && !completionDate) {
      newErrors.completionDate = 'A data de conclusão é obrigatória para tarefas concluídas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit({
      title,
      description,
      status,
      completionDate: completionDate || null,
      createdAt: chore?.createdAt || new Date().toISOString(),
    });
  };

  const statusOptions = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'emProgresso', label: 'Em Progresso' },
    { value: 'concluida', label: 'Concluída' },
  ];

  const handleStatusChange = (value: string) => {
    setStatus(value as ChoreReadDto['status']);
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={chore ? 'Editar Tarefa' : 'Nova Tarefa'}
      footer={
        <>
          <Button variant="text" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{chore ? 'Salvar' : 'Criar'}</Button>
        </>
      }
    >
      <FormContainer>
        <Input
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          required
        />
        <Input
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          required
        />
        <Select
          label="Status"
          value={status}
          onChange={handleStatusChange}
          options={statusOptions}
        />
        <Input
          label="Data de Conclusão"
          type="date"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
          error={errors.completionDate}
        />
      </FormContainer>
    </Modal>
  );
};

export default ChoreModal;
