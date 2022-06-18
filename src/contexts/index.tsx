import React from 'react';

import { AuthProvider } from './AuthContext';
import { JobProvider } from './JobContext';

function GlobalContext({ children }: any) {
  return (
    <AuthProvider>
      <JobProvider>{children}</JobProvider>
    </AuthProvider>
  );
}

export default GlobalContext;
