import React, { useState } from 'react';

import { getUser, logout } from 'core';
// import useGlobalData from '../../hooks/useGlobalData';

// import styles from './styles.module.scss';

const ProfileUserApi: React.FC = () => {
  const [posts, setPosts] = useState({
    data: {
      success: 0,
      user: {
        id: '',
        name: '',
        email: '',
        password: ''
      }
    }
  });

  React.useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const test: any = await getUser();

        setPosts(test);
      } catch (err) {
        return logout();
      }
    };
    fetchTokenList();
  }, [setPosts]);

  return (
    <div>
      <p>{posts.data.user.name}</p>
      <p>{posts.data.user.email}</p>
      <p>{posts.data.user.id}</p>
    </div>
  );
};

export default ProfileUserApi;
