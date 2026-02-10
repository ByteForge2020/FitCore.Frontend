import { useEffect } from "react";
import { matchPath, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate, deauthenticate } from '../../../store/slices/authentication-slice';
import { Url } from '../../../constants/url';
import { ApiClient } from '../../axios/api-client';


export function AuthenticationProvider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    ApiClient.initialize().then((result) => result ? authenticateUser() : redirectToLogin());
  }, []);
  
  function authenticateUser() {
    dispatch(authenticate());
  }
  
  function redirectToLogin() {
    dispatch(deauthenticate());
    const location = window.location.pathname;
    const isViableRoute = matchPath(location, Url.Authentication.Login);
    if (!isViableRoute) {
      navigate(Url.Authentication.Login);
    }
  }
  
  return null;
}