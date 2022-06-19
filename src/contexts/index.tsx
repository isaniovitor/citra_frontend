import React from 'react';

import { AuthProvider } from './AuthContext';
import { CandidacyProvider } from './CandicacyContext';
import { JobProvider } from './JobContext';

function GlobalContext({ children }: any) {
  return (
    <AuthProvider>
      <CandidacyProvider>
        <JobProvider>{children}</JobProvider>
      </CandidacyProvider>
    </AuthProvider>
  );
}

export default GlobalContext;
