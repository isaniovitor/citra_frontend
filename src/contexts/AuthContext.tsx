import {
  createContext,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import type { UserData } from '../@types/user';
import api from '../services/api';
import request from '../services/request';
// import { useHistory } from 'react-router-dom';

interface AuthContextState {
  signIn({ Email, password }: UserDataLogin): Promise<boolean>;
  singOut(): void;
  userUpdate({ Email, password }: UserData): Promise<boolean>;
  userRegister({ Email, password }: UserData): Promise<boolean>;
  isLogged: boolean;
  user: UserData | null;
}

interface UserDataLogin {
  Email: string | undefined;
  password: string | undefined;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserData | null>(null);
  const [userToken, setUserToken] = useState((): any => {
    const hasToken = localStorage.getItem('@PermissionYT:token');

    if (hasToken) {
      api.defaults.headers.common.authorization = `Bearer ${hasToken}`;
      // return { hasToken };
      return true;
    }

    return true;
  });

  const signIn = useCallback(async ({ Email, password }: UserDataLogin) => {
    let success = false;

    // const response = await api.post('/sessions', {
    //   username,
    //   password,
    // });

    const response = await request.get('users');
    // console.log(response);

    // const { token, usuario } = response.data;
    // setUserToken(token);
    // const { data } = response.data;
    // console.log(response.data);

    response.data.results.forEach((element: any) => {
      if (element.Email === Email && element.password === password) {
        setUser(element);
        success = true;

        localStorage.setItem('token', `${[element.Email, element.password]}`);
        // api.defaults.headers.common.authorization = `Bearer ${element.userId}`;
      }
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
      name,
      Email,
      cep,
      password,
      fone,
      cpf,
      cv,
      birthdate,
      picture,
    }: UserData) => {
      let success = false;
      const dataForm = new FormData();

      // solution for the error: O dado submetido não é um arquivo. Certifique-se do tipo de codificação no formulário.
      // tirar cv e picture como obg

      if (cv !== undefined) dataForm.append('cv', cv);
      if (picture !== undefined) dataForm.append('picture', picture);

      dataForm.append('name', name);
      dataForm.append('Email', Email);
      dataForm.append('cep', cep);
      dataForm.append('password', password);
      dataForm.append('fone', fone);
      dataForm.append('cpf', cpf);
      dataForm.append('birthdate', birthdate);
      // data.append('description', description);

      try {
        const response = await request.post('users', dataForm);

        console.log(response.status);

        if (response.status >= 200 && response.status < 300) {
          // console.log('aq');
          success = true;
        }
      } catch (err: any) {
        const { data } = err.response;
        console.log(data);

        if (data.cpf) {
          data.cpf.forEach((element: any) => {
            toast.error(`CPF: ${element}`);
          });
        }

        if (data.CPF) {
          data.CPF.forEach((element: any) => {
            toast.error(`CPF: ${element}`);
          });
        }

        // // const newData = JSON.parse(data);
        // // console.log(l);

        // data.Email.forEach((error: any) => {
        //   // console.log(data);

        //   toast.error(`${error}`);
        // });
      }

      return success;
    },
    [],
  );

  const userUpdate = useCallback(
    async ({
      userId,
      name,
      Email,
      cep,
      password,
      fone,
      cpf,
      cv,
      birthdate,
      picture,
      description,
    }: UserData) => {
      let success = false;
      const data = new FormData();

      // solution for the error: O dado submetido não é um arquivo. Certifique-se do tipo de codificação no formulário.
      // tirar cv e picture como obg
      const token = localStorage.getItem('token');
      console.log(token);

      if (cv !== undefined) data.append('cv', cv);
      if (picture !== undefined) data.append('picture', picture);

      data.append('name', name);
      data.append('Email', Email);
      data.append('cep', cep);
      data.append('password', password);
      data.append('fone', fone);
      data.append('cpf', cpf);
      data.append('birthdate', birthdate);
      data.append('description', description);

      try {
        const response = await request.update('users', userId, data);

        if (response.status >= 200 && response.status < 300) {
          success = true;
          setUser(response.data);
        }
      } catch (err: any) {
        console.log(err);
      }

      return success;
    },
    [],
  );

  // getCandidatetions

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        signIn,
        singOut,
        userUpdate,
        userRegister,
        isLogged: !!user,
        user,
      }}
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
