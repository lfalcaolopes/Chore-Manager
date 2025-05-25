'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChoreReadDto, ChoreStatus } from '@/src/types/chores';
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
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<ChoreStatus>('Pendente');
  const [dataDeConclusao, setDataDeConclusao] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (chore) {
      setTitulo(chore.titulo);
      setDescricao(chore.descricao || '');
      setStatus(chore.status);
      setDataDeConclusao(chore.dataDeConclusao || '');
    } else {
      setTitulo('');
      setDescricao('');
      setStatus('Pendente');
      setDataDeConclusao('');
    }
    setErrors({});
  }, [chore, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!titulo.trim()) newErrors.titulo = 'O título é obrigatório';
    if (status === 'Concluida' && !dataDeConclusao) {
      newErrors.dataDeConclusao = 'A data de conclusão é obrigatória para tarefas concluídas';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit({
      titulo,
      descricao,
      status,
      dataDeConclusao: dataDeConclusao || null,
      dataDeCriacao: chore?.dataDeCriacao || new Date().toISOString(),
    });
  };

  const statusOptions = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'EmProgresso', label: 'Em Progresso' },
    { value: 'Concluida', label: 'Concluída' },
  ];

  const handleStatusChange = (value: string) => {
    setStatus(value as ChoreStatus);
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
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          error={errors.titulo}
          required
        />
        <Input
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          error={errors.descricao}
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
          value={dataDeConclusao}
          onChange={(e) => setDataDeConclusao(e.target.value)}
          error={errors.dataDeConclusao}
        />
      </FormContainer>
    </Modal>
  );
};

export default ChoreModal;
