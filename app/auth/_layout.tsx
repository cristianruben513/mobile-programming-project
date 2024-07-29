import React, { useState } from 'react';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';

interface SignUpProps {
    setIsSignedUp: React.Dispatch<React.SetStateAction<boolean>>;
    setFirstTimeRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthNavigator({ setIsSignedUp, setFirstTimeRegister }: SignUpProps) {
    const [firstTimeRegister, setFirstTimeRegisterInternal] = useState<boolean>(true);

    const handleChangePage = () => {
        setFirstTimeRegisterInternal(false);
    };

    if (firstTimeRegister) {
        return <SignUp setIsSignedUp={setIsSignedUp} setFirstTimeRegister={handleChangePage} />;
    }
    else{
        return (
            <SignIn setIsSignedUp={setIsSignedUp} setFirstTimeRegister={handleChangePage}/>
        );
    }
    
}
