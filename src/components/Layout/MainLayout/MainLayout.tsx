import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

import styles from './MainLayout.module.scss';

type MainLayoutProps = {
  children: JSX.Element;
};

const Component = (props: MainLayoutProps) => (
  <div className={styles.root}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
