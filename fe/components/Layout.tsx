import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import { useLayout } from '../styles'
import { useContextApi } from '../context/Context'
import { LayoutProps } from '../interfaces'


const Layout = ({ children, title = 'This is the default title' }: LayoutProps) => {
  const { classes } = useLayout();
  const { user } = useContextApi();
  useEffect(() => {
    if (!user) {
      Router.push('/account');
    } else if (user.role === 'admin') {
      Router.push('/dashboard');
    } else if (user.role === 'user') {
      Router.push('/consultant');
    }
  }, [user]);

  return (
    <div className={classes.app}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  )
}
export default Layout
