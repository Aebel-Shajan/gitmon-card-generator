import { Helmet } from "react-helmet";

interface MetaTagProps {
  title: string;
  description: string;
  imageUrl: string;
}

function MetaTag({ title, description, imageUrl }: MetaTagProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Facebook tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" itemProp="image" content={imageUrl} />

      {/* Twitter tags */}
      <meta name="twitter:card" content={imageUrl} />
      <meta name="twitter:title" content={title} />
    </Helmet>
  );
}

export default MetaTag;
