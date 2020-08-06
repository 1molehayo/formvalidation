import React from 'react';
import { PageLayout } from 'layouts/PageContainer';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { name } = useParams();

  return (
    <PageLayout pageClass="home">
      <section className="section">
        <div className="container">
          <p className="paragraph">Hi, {name}</p>
          <h3 className="heading">Welcome to Softcom</h3>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
