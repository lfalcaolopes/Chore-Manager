export type ChoreStatus = 'pendente' | 'emProgresso' | 'concluida';

export interface ChoreFormValues {
  title: string;
  description: string;
  status: ChoreStatus;
  completionDate: string | null;
}

export interface ChoreReadDto {
  id: number;
  title: string;
  description: string;
  status: ChoreStatus;
  completionDate: string | null;
  createdAt: string;
}
