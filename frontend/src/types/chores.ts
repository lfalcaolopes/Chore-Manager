export type ChoreStatus = 'Pendente' | 'EmProgresso' | 'Concluida';

export interface ChoreReadDto {
  id: number;
  titulo: string;
  descricao: string | null;
  dataDeCriacao: string;
  dataDeConclusao: string | null;
  status: ChoreStatus;
}

export interface ChoreCreateDto {
  titulo: string;
  descricao: string | null;
  status: ChoreStatus;
}

export interface ChoreUpdateDto {
  titulo?: string;
  descricao?: string | null;
  status?: ChoreStatus;
  dataDeConclusao?: string | null;
}
