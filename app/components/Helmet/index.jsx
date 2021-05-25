import React from 'react';
import { Helmet } from 'react-helmet';

import T from 'prop-types';

const production = process.env.NODE_ENV === 'production';
const baseUrl = production ? 'https://rysolv.com' : `http://localhost:3000`;
const defaultImage =
  'https://rysolv.s3.us-east-2.amazonaws.com/rysolv_social_image.PNG';

const HelmetComponent = ({ title, location, description }) => {
  const url = baseUrl + location;
  return (
    <div className="application">
      <Helmet>
        <link rel="canonical" href={url} />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="language" content="english" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={defaultImage} />
        <meta property="og:site_name" content="rysolv" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

HelmetComponent.propTypes = {
  description: T.string.isRequired,
  location: T.string.isRequired,
  title: T.string.isRequired,
};

export default HelmetComponent;
