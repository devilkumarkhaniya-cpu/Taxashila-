'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (error: any) => {
      console.error('Firebase Permission Error:', error);
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: `Error during ${error.operation} at ${error.path}. Please check your connection or permissions.`,
      });
    });

    return () => unsubscribe();
  }, [toast]);

  return null;
}
