import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="hero">
        <h1>About Rate Your Landlord MSU</h1>
        <p className="hero__subtitle">A community-driven platform for East Lansing tenants</p>
      </div>

      <div className="about-sections">
        <section>
          <h2>Our Mission</h2>
          <p>
            Tenants in East Lansing deserve to know what they're getting into when searching for a place to live, and the public deserves to know about negligent landlords. With Rate Your Landlord MSU, you can read first hand accounts from your neighbors and share about your experiences as a tenant. The way the site works is simple: you can give your landlord a grade – it’s Rate My Professor, but for your landlord. Rate Your Landlord Michigan State is part of More Perfect University’s national Rate Your Landlord campaign.
          </p>
        </section>

        <section>
          <h2>Get Involved</h2>
          <p>
            Know a landlord who isn't listed yet? Add them. Had a recent experience worth sharing? Write a review. The more people participate, the more useful this platform becomes for tenants. Email us at{' '}
            <a href="mailto:rylmichiganstate@gmail.com">rylmichiganstate@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
