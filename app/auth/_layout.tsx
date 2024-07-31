import SignIn from "@/components/screens/SignIn";
import SignUp from "@/components/screens/SignUp";
import React, { useState } from "react";

interface AuthNavigatorProps {
  setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstTimeRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthNavigator({
  setIsSignedUp,
  setFirstTimeRegister,
}: AuthNavigatorProps) {
  const [firstTimeRegister, setFirstTimeRegisterInternal] = useState(true);

  const handleChangePage = (isRegistering: boolean) => {
    setFirstTimeRegisterInternal(isRegistering);
  };

  return firstTimeRegister ? (
    <SignUp
      setIsSignedUp={setIsSignedUp}
      setFirstTimeRegister={() => handleChangePage(false)}
    />
  ) : (
    <SignIn
      setIsSignedUp={setIsSignedUp}
      setFirstTimeRegister={() => handleChangePage(true)}
    />
  );
}
