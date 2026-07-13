import { ITask } from '@/types/interfaces';
import { API_URL } from '@/constants/form';
import axios from 'axios';

export const tasksService = {
  async getAll(): Promise<ITask[]> {
    const {data} = await axios.get<ITask[]>(API_URL);

    return data.map(task => ({
      ...task,
      repeating_date: typeof task.repeating_date === 'string'
        ? JSON.parse(task.repeating_date)
        : task.repeating_date
    }))
  },

  async create(task: ITask): Promise<void> {
    await axios.post(API_URL, task);
  },

  async update(id: number, task: ITask): Promise<void> {
    await axios.put(`${API_URL}/${id}`, task);
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
}