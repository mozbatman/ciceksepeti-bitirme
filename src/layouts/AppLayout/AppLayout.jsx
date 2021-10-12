import * as React from "react";
import Header from "../../components/shared/Header/Header";
import styles from './AppLayout.module.scss';

const AppLayout = ({ header, children }) => {

    return (
        <div id="layout-app" className={styles.layoutApp}>
            {header && <Header />}
            <div className={styles.mainContent}>{children}</div>
        </div>
    );
};

export default AppLayout;
