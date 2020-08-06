import React from 'react';
import { PageLayout } from 'layouts/PageContainer';
import { useAuth } from 'utility/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <PageLayout pageClass="home">
      <section className="section">
        <div className="container">
          <p className="paragraph">Hi, {user.name}</p>
          <h3 className="heading">Welcome to Softcom</h3>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
