import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useRive, useStateMachineInput } from 'rive-react';

import Avatar from '../../components/animations/AnimatedAvatar';
import Input from '../../components/Form/Input';
import { singInUserSchema } from '../../constants/schemas';
import { useAuth } from '../../contexts/AuthContext';
import { validationForm } from '../../helpers/validationFom';

import * as S from './styles';

const STATE_MACHINE_NAME = 'State Machine 1';

function Login() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { signIn } = useAuth();

  const { rive, RiveComponent } = useRive({
    src: '520-990-teddy-login-screen.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  const stateHandUp = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    'hands_up',
  );

  const stateCheck = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Check');
  const stateLook = useStateMachineInput(rive, STATE_MACHINE_NAME, 'Look');

  // const triggerSuccess = () => {
  //   stateSuccess && stateSuccess.fire();
  // };
  // const triggerFail = () => {
  //   stateFail && stateFail.fire();
  // };

  const setHangUp = hangUp => {
    stateHandUp && (stateHandUp.value = hangUp);
  };

  const setCheck = check => {
    if (stateCheck) {
      stateCheck.value = check;
    }
  };

  const setLook = () => {
    if (!stateLook || !stateCheck || !setHangUp) {
      return;
    }

    setHangUp(false);
    setCheck(true);

    let nbChars = 0;
    const data = formRef.current?.getFieldValue('email');

    if (data) {
      nbChars = parseFloat(data.split('').length);
    }

    // useEffect(() => {
    //   setLook();
    // }, []);

    const ratio = nbChars / parseFloat(41);
    // console.log(`ratio ${ratio}`);

    const lookToSet = ratio * 100 - 25;
    // console.log(`lookToSet ${Math.round(lookToSet)}`);
    stateLook.value = Math.round(lookToSet);
  };

  async function handleSubmit(data: any, { reset }: any) {
    if (await validationForm(data, singInUserSchema, formRef)) {
      if (await signIn({ Email: data.email, password: data.password })) {
        navigate('/home', { replace: true });
        toast.success('Login feito com sucesso!');
      } else {
        toast.error('Falha ao fazer login!');
      }
    }
  }

  return (
    <S.Conteiner>
      <S.FormConteiner ref={formRef} onSubmit={handleSubmit}>
        {/* <S.IconConteiner /> */}

        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            position: 'absolute',
            top: ' -40px',
          }}
        >
          <RiveComponent
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              zoom: '100px',
              // transform: 'scale(1.5)',
            }}
            src="520-990-teddy-login-screen.riv"
          />
          {/* <img src={avatar} alt="" /> */}
        </div>

        <S.InputContainer>
          <Input name="email" label="Email" onChange={setLook} />

          <Input
            name="password"
            label="Senha"
            type="password"
            onChange={() => setHangUp(true)}
          />

          <button type="submit">Entrar</button>
          {/* <hr /> */}
        </S.InputContainer>

        <p>Esqueceu a senha?</p>
        <hr />

        <Link to="/userRegister">
          <button type="button">Cadastrar </button>
        </Link>
      </S.FormConteiner>
    </S.Conteiner>
  );
}

export default Login;
