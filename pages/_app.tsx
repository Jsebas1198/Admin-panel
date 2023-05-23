import {
  AuthBindings,
  Refine,
} from '@refinedev/core';
import {
  RefineKbar,
  RefineKbarProvider,
} from '@refinedev/kbar';
import {
  RefineSnackbarProvider,
  ThemedLayoutV2,
  notificationProvider,
} from '@refinedev/mui';
import routerProvider, {
  UnsavedChangesNotifier,
} from '@refinedev/nextjs-router';
import type { NextPage } from 'next';
import {
  SessionProvider,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
  Dashboard,
} from '@mui/icons-material';
import { Header } from '@components/header';
import { ColorModeContextProvider } from '@contexts';
import {
  CssBaseline,
  GlobalStyles,
} from '@mui/material';
import dataProvider from '@refinedev/simple-rest';

import '@styles/global.css';

// const API_URL =
//   'https://api.fake-rest.refine.dev';

// const API_URL = 'http://localhost:8080/api/v1';

const API_URL = 'http://localhost:4000';

export type NextPageWithLayout<
  P = {},
  IP = P
> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (props: React.PropsWithChildren) => {
  const { data, status } = useSession();
  const router = useRouter();
  const { to } = router.query;

  if (status === 'loading') {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async () => {
      signIn('google', {
        callbackUrl: to ? to.toString() : '/home',
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
      localStorage.removeItem('user');
      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return {
        error,
      };
    },
    check: async () => {
      if (status === 'unauthenticated') {
        return {
          authenticated: false,
          redirectTo: '/login',
        };
      }
      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;

        //prueba  de insercion de datos

        const response = await fetch(
          // 'http://localhost:8080/api/v1/users',

          'http://localhost:4000/users',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              avatar: user.image,
            }),
          }
        );

        const actualuser = await response.json();

        if (response.status === 202) {
          localStorage.setItem(
            'user',
            JSON.stringify(actualuser)
          );
        } else {
          return Promise.reject(
            'Failed to create user'
          );
        }

        return {
          userId: actualuser._id,
          name: user.name,
          email: user.email,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles
            styles={{
              html: {
                WebkitFontSmoothing: 'auto',
              },
            }}
          />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              notificationProvider={
                notificationProvider
              }
              authProvider={authProvider}
              resources={[
                {
                  name: 'dashboard',
                  list: '/home',
                  meta: {
                    label: 'Dashboard',
                    canDelete: true,
                    icon: <Dashboard />,
                  },
                },
                {
                  name: 'properties',
                  list: '/properties/all',
                  create: '/properties/create',
                  edit: '/properties/edit/:id',
                  show: '/properties/detail/:id',
                  meta: {
                    label: 'Properties',
                    canDelete: true,
                    icon: <VillaOutlined />,
                  },
                },
                {
                  name: 'agents',
                  list: '/agents/all',
                  show: '/agents/show/:id',
                  meta: {
                    label: 'Agents',
                    canDelete: true,
                    icon: <PeopleAltOutlined />,
                  },
                },
                {
                  name: 'reviews',
                  list: '/home',
                  meta: {
                    label: 'Reviews',
                    canDelete: true,
                    icon: <StarOutlineRounded />,
                  },
                },
                {
                  name: 'messages',
                  list: '/home',
                  meta: {
                    label: 'Messages',
                    canDelete: true,
                    icon: <ChatBubbleOutline />,
                  },
                },
                {
                  name: 'profile',
                  list: '/profile',
                  meta: {
                    label: 'My profile',
                    canDelete: true,
                    icon: (
                      <AccountCircleOutlined />
                    ),
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              {props.children}
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header isSticky={true} />}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <SessionProvider session={session}>
      <App>{renderComponent()}</App>
    </SessionProvider>
  );
}

export default MyApp;
