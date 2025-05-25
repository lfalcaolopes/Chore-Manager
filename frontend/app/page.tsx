'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ChoreBoard from '@/components/ChoreBoard';
import ChoreModal from '@/components/ChoreModal';
import { ChoreReadDto } from '@/types/chore';
import { mockChores } from '@/mocks/chores';

export default function Home() {
  const [chores, setChores] = useState<ChoreReadDto[]>(mockChores);
  const [statusFilter, setStatusFilter] = useState<ChoreReadDto['status'] | 'todos'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChore, setEditingChore] = useState<ChoreReadDto | undefined>();

  const filteredChores =
    statusFilter === 'todos' ? chores : chores.filter((chore) => chore.status === statusFilter);

  const handleCreateClick = () => {
    setEditingChore(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (chore: ChoreReadDto) => {
    setEditingChore(chore);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setChores(chores.filter((chore) => chore.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: ChoreReadDto['status']) => {
    setChores(chores.map((chore) => (chore.id === id ? { ...chore, status: newStatus } : chore)));
  };

  const handleModalSubmit = (choreData: Omit<ChoreReadDto, 'id'>) => {
    if (editingChore) {
      setChores(
        chores.map((chore) =>
          chore.id === editingChore.id ? { ...choreData, id: chore.id } : chore,
        ),
      );
    } else {
      const newChore: ChoreReadDto = {
        ...choreData,
        id: Math.max(...chores.map((c) => c.id), 0) + 1,
      };
      setChores([...chores, newChore]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateClick={handleCreateClick}
      />
      <main className="p-6">
        <ChoreBoard
          chores={filteredChores}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </main>
      <ChoreModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        chore={editingChore}
      />
    </div>
  );
}
