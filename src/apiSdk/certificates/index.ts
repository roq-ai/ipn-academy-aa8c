import axios from 'axios';
import queryString from 'query-string';
import { CertificateInterface, CertificateGetQueryInterface } from 'interfaces/certificate';
import { GetQueryInterface } from '../../interfaces';

export const getCertificates = async (query?: CertificateGetQueryInterface) => {
  const response = await axios.get(`/api/certificates${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCertificate = async (certificate: CertificateInterface) => {
  const response = await axios.post('/api/certificates', certificate);
  return response.data;
};

export const updateCertificateById = async (id: string, certificate: CertificateInterface) => {
  const response = await axios.put(`/api/certificates/${id}`, certificate);
  return response.data;
};

export const getCertificateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/certificates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCertificateById = async (id: string) => {
  const response = await axios.delete(`/api/certificates/${id}`);
  return response.data;
};
