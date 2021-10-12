import { Route } from "react-router";
import * as React from "react";

const AppRoute = ({ component: Component, layout: Layout, path: Path, layoutProps: LayoutProps, ...rest }) => {
    const layoutRef = React.createRef();
    const pageRef = React.createRef();

    return <Route {...rest} render={props =>
                 (
                    <Layout ref={layoutRef} {...LayoutProps} pageRef={pageRef}>
                        <Component {...props} layoutRef={layoutRef} ref={pageRef} />
                    </Layout>
                  )
                }
            />;
}

export default AppRoute;