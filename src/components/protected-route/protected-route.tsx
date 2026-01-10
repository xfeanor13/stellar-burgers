import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks';
import { selectIsAuthChecked, selectUser } from '@selectors/user';
import { Preloader } from '@components/ui';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

// реализую протектед роутед
export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const user = useAppSelector(selectUser);
  const location = useLocation();

  // пока авторизация не прошла, показываю прелоадер
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // если нет данных о пользователе, перевожу в окно авторизации. Запоминаю локацию, что вернуть пользователя обратно в тоже место после успешной авторизации.
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // если пользователь авторизован, он идет на домашнюю страницу
  if (onlyUnAuth && user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
