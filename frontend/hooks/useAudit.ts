import { useState } from 'react';
import { api } from '../services/api';
import type { AuditResponse } from '@/types/audit';

export function useAudit() {
  const [response, setResponse] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAudit = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);
      
      const { data } = await api.post<AuditResponse>('/audit', { url });
      setResponse(data);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while communicating with the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { submitAudit, loading, error, response };
}
