import { getSortedProjectData } from 'lib/projects';
import Link from 'next/link';
import BaseLayout from 'layouts/base';

export default function PostPage({ allProjectData }) {
  return (
    <BaseLayout>
      <div className="prose prose-lg">
        <h1>All Projects</h1>
        {allProjectData.map((data) => (
          <div>
            <h2>{data.title}</h2>
            <Link href={data.slug}>Read -></Link>
          </div>
        ))}
      </div>
    </BaseLayout>
  );
}

export async function getStaticProps() {
  const allProjectData = getSortedProjectData();
  return {
    props: {
      allProjectData,
    },
  };
}
