import { useCallback, useEffect, useState } from 'react';
import { useRive, useStateMachineInput } from 'rive-react';

// const theme = createTheme();

const STATE_MACHINE_NAME = 'State Machine 1';

export default function Avatar() {
  const [user, setUser] = useState(null);

  const { rive, RiveComponent } = useRive({
    src: '520-990-teddy-login-screen.riv',
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  // const stateSuccess = useStateMachineInput(
  //   rive,
  //   STATE_MACHINE_NAME,
  //   'success',
  // );
  // const stateFail = useStateMachineInput(rive, STATE_MACHINE_NAME, 'fail');
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

    if (user) {
      nbChars = parseFloat(user.split('').length);
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

  // if (rive) {
  //   console.log(rive.contents);
  // }

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  // useEffect(() => {
  //   setLook();
  // }, [setLook, user]);

  return [
    <div>
      {/* <CssBaseline /> */}

      <div>
        <RiveComponent
          style={{ width: '400px', height: '400px' }}
          src="520-990-teddy-login-screen.riv"
        />
        {/* <img src={avatar} alt="" /> */}
      </div>

      {/* <form autoComplete="off">
          <input
            onFocus={() => setHangUp(false)}
            onChange={event => {
              setUser(event.target.value);
              setLook();
            }}
            // value={user}
            // margin="normal"
            required
            // fullWidth
            id="email"
            // label="Email Address"
            name="email"
            autoComplete="email"
            // autoFocus
          />
          <input
            onChange={(event: any) => {
              setHangUp(true);
              setPassword(event.target.value);
              // setHangUp(false);
            }}
            // onFocus={() => setHangUp(true)}
            // onE
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </form> */}

      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </div>,
  ];
}
