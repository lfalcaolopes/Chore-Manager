import { ChoreReadDto } from '@/types/chore';

export const mockChores: ChoreReadDto[] = [
  {
    id: 1,
    title: 'Implementar autenticação',
    description: 'Adicionar sistema de login e registro de usuários',
    createdAt: '2024-03-15T10:00:00Z',
    completionDate: null,
    status: 'pendente',
  },
  {
    id: 2,
    title: 'Criar testes unitários',
    description: 'Implementar testes para os componentes principais',
    createdAt: '2024-03-14T15:30:00Z',
    completionDate: null,
    status: 'emProgresso',
  },
  {
    id: 3,
    title: 'Configurar CI/CD',
    description: 'Configurar pipeline de integração contínua',
    createdAt: '2024-03-13T09:15:00Z',
    completionDate: '2024-03-14T16:45:00Z',
    status: 'concluida',
  },
  {
    id: 4,
    title: 'Refatorar código legado',
    description: 'Melhorar a estrutura do código existente',
    createdAt: '2024-03-15T11:20:00Z',
    completionDate: null,
    status: 'pendente',
  },
  {
    id: 5,
    title: 'Documentar API',
    description: 'Criar documentação detalhada dos endpoints',
    createdAt: '2024-03-14T14:00:00Z',
    completionDate: null,
    status: 'emProgresso',
  },
  {
    id: 6,
    title: 'Implementar cache',
    description: 'Adicionar sistema de cache para melhorar performance',
    createdAt: '2024-03-12T08:30:00Z',
    completionDate: '2024-03-13T17:20:00Z',
    status: 'concluida',
  },
];
