import { Route, Redirect } from "react-router";
import { createRef, useEffect, useState } from "react";

import auth from "../../helpers/auth";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

const AppRoute = ({ component: Component, layout: Layout, path: Path, layoutProps: LayoutProps, ...rest }) => {
    const layoutRef = createRef();
    const pageRef = createRef();

    const [cookies, setCookie] = useCookies(['authToken']);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      if (typeof(cookies["authToken"]) !== "undefined") {
        setIsAuthenticated(true);
      }
    })
    
    return <Route {...rest} render={props =>
                true ?
                 (
                    <Layout ref={layoutRef} {...LayoutProps} pageRef={pageRef}>
                        <Component {...props} layoutRef={layoutRef} ref={pageRef} />
                    </Layout>
                  )
                : <Redirect to="/" />
                }
            />;
}

export default AppRoute;