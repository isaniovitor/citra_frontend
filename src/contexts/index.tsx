import React from 'react';

import { AuthProvider } from './AuthContext';

function GlobalContext({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default GlobalContext;
