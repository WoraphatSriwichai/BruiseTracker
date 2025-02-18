import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  country: string;
}

interface UserContextProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Pathomphong Chaichuay',
    email: 'pang@gmail.com',
    phone: '0123456789',
    country: 'Japan',
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};