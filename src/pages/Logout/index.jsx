import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Reducers
import { logout } from 'store/reducers/auth';

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);
  return <div></div>;
}
