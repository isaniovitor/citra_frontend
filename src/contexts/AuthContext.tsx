import {
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../services/api';
import request from '../services/request';
// import { useHistory } from 'react-router-dom';

interface AuthContextState {
  signIn({ email, password }: UserDataLogin): Promise<boolean>;
  singOut(): void;
  userRegister({ Email, Senha }: UserData): Promise<boolean>;
  isLogged: boolean;
  user: object | null;
}

interface UserDataLogin {
  email: string;
  password: string;
}

interface UserData {
  NomeCompleto: string;
  Email: string;
  CEP: string;
  Senha: string;
  Celular: string;
  CPF: string;
  Foto: null;
  Curriculo: null;
  Descricao: string;
  DataNasc: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<object | null>(null);
  const [userToken, setUserToken] = useState((): any => {
    const hasToken = localStorage.getItem('@PermissionYT:token');

    if (hasToken) {
      api.defaults.headers.common.authorization = `Bearer ${hasToken}`;
      // return { hasToken };
      return true;
    }

    return true;
  });

  // console.log(userToken);

  const signIn = useCallback(async ({ email, password }: UserDataLogin) => {
    let success = false;

    // const response = await api.post('/sessions', {
    //   username,
    //   password,
    // });

    const response = await request.get('usuarios');
    console.log(response);

    // const { token, usuario } = response.data;
    // setUserToken(token);
    // const { data } = response.data;
    // console.log(response.data);

    response.data.forEach((element: any) => {
      if (element.Email === email && element.Senha === password) {
        setUser(element);
        success = true;

        // localStorage.setItem('@PermissionYT:token', token);
        // api.defaults.headers.common.authorization = `Bearer ${token}`;
      }

      // if (
      //   (element.Email === email && element.Senha !== password) ||
      //   (element.Email !== email && element.Senha === password)
      // ) {
      //   toast.error('Email ou senha incorretos!');
      // }
      // console.log('aqa');
    });

    return success;

    // console.log('aqa');
    // deu ruim
    // alert('ruim');
    // toast.error('Falha ao fazer login!');
  }, []);

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    setUserToken(null);
  };

  const userRegister = useCallback(
    async ({
      NomeCompleto,
      Email,
      CEP,
      Senha,
      Celular,
      CPF,
      DataNasc,
      Foto,
      Descricao,
    }: UserData) => {
      let success = false;

      const response = await request.postUser('usuarios', {
        NomeCompleto,
        Email,
        CEP,
        Senha,
        Celular,
        CPF,
        DataNasc,
        Foto,
        Descricao,
      });

      if (response.status >= 200 && response.status < 300) {
        success = true;
      }

      return success;
    },
    [],
  );

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ signIn, singOut, userRegister, isLogged: !!user, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
