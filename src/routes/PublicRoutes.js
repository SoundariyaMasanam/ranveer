import React from "react";
import Layout from "layout/Authlayout";
const PublicRoutes = ({routeIndex, component: Component, ...rest }) => {
  return (
    <>
      <Layout routeIndex={routeIndex}>
        <Component {...rest} />
      </Layout>
    </>
  )
}

export default PublicRoutes;