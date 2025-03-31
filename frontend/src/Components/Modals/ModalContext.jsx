import { createContext, useContext, useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const ModalContext = createContext({});

export function ModalProvider({ children }) {
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [signupModalOpened, setSignupModalOpened] = useState(false);

  const openLoginModal = () => setLoginModalOpened(true);
  const openSignupModal = () => setSignupModalOpened(true);

  return (
    <ModalContext.Provider value={{ openLoginModal, openSignupModal }}>
      <LoginModal
        opened={loginModalOpened}
        onClose={() => setLoginModalOpened(false)}
        onSwitchToSignup={() => {
          setLoginModalOpened(false);
          setSignupModalOpened(true);
        }}
      />
      <SignupModal
        opened={signupModalOpened}
        onClose={() => setSignupModalOpened(false)}
        onSwitchToLogin={() => {
          setSignupModalOpened(false);
          setLoginModalOpened(true);
        }}
      />
      {children}
    </ModalContext.Provider>
  );
}

export const useModals = () => useContext(ModalContext);