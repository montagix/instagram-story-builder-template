import React from 'react';
import './Layout.styles.scss';

const Layout = (props: React.PropsWithChildren) => {
  return (
    <div className="layout__fixed">
      <div className="layout__overlay"></div>

      <div className="layout__box">
        <div className="layout__container">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
