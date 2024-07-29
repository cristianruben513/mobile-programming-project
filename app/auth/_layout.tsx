import React, { useState } from 'react';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';

interface AuthNavigatorProps {
    setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
    setFirstTimeRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthNavigator({ setIsSignedUp, setFirstTimeRegister }: AuthNavigatorProps) {
    const [firstTimeRegister, setFirstTimeRegisterInternal] = useState<boolean>(true);

    console.log(firstTimeRegister);

    const handleChangePage = (isRegistering: boolean) => {
        setFirstTimeRegisterInternal(isRegistering);
    };

    return firstTimeRegister ? (
        <SignUp setIsSignedUp={setIsSignedUp} setFirstTimeRegister={() => handleChangePage(false)} />
    ) : (
        <SignIn setIsSignedUp={setIsSignedUp} setFirstTimeRegister={() => handleChangePage(true)} />
    );
}

