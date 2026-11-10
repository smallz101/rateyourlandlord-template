import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="content-page">
      <h1>Contact Us</h1>
      <p>
        If you have any questions, feedback, or need assistance, contact Rate Your Landlord MSU.
      </p>
      <h2>Email</h2>
      <p>
        You can email us at{' '}
        <a href="mailto:rylmichiganstate@gmail.com">rylmichiganstate@gmail.com</a>.
      </p>
      <h2>Instagram</h2>
      <p>
        Follow us at{' '}
        <a href="https://www.instagram.com/rylmsu/" target="_blank" rel="noopener noreferrer">@rylmsu</a>.
      </p>
    </div>
  );
};

export default ContactPage;
