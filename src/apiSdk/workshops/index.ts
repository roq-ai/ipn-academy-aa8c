import axios from 'axios';
import queryString from 'query-string';
import { WorkshopInterface, WorkshopGetQueryInterface } from 'interfaces/workshop';
import { GetQueryInterface } from '../../interfaces';

export const getWorkshops = async (query?: WorkshopGetQueryInterface) => {
  const response = await axios.get(`/api/workshops${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWorkshop = async (workshop: WorkshopInterface) => {
  const response = await axios.post('/api/workshops', workshop);
  return response.data;
};

export const updateWorkshopById = async (id: string, workshop: WorkshopInterface) => {
  const response = await axios.put(`/api/workshops/${id}`, workshop);
  return response.data;
};

export const getWorkshopById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/workshops/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWorkshopById = async (id: string) => {
  const response = await axios.delete(`/api/workshops/${id}`);
  return response.data;
};
