import React from 'react';

function About() {
  return (
    <div className="container">
      {' '}
      <div className="row">
        <div className="section grey-text">
          <div className="center">
            <h5>About</h5>
          </div>
          <p>
            This is my first is my first application built using MERN stack.
            <br />
            I have attempted to incorporate some cloud technologies, as in the
            long run, I am interested in becoming an AWS DevOps. As a result,
            product images are stored in S3 bucket and application is deployed
            on Ubuntu EC2 instance.
            <br /> <br />
            Payment processing relies on Stripe payment systemt, in particular
            @stripe/react-stripe-js. Please use 4242 4242 4242 4242 test card
            number along with any random exp date and ccv numbers, to test out
            the payment processing experience. <br />
            <br />I implemented some UI admin functionality, such as product
            image upload and product creation.Even though it is a demo web
            app,in order to prevent tempering, by default new users are assigned
            'user' role.Furthermore, in order to test all functionality, please
            create an account or use demo account: <br />
            <div />
            <span className="blue-text"> johndoe@gmail.com 123456</span>
            <div />
            <br /> <br />
            Admittedly, there are some loose ends in this project, firstly
            because it is my first project overall, and secondly, it is
            continiously being reinvented, therefore not yet fully sculpted
            functionality is disabled.
            <br />
            <br />
            Currently, my all energy and focus are devoted to my second project
            where I delve deeper into the subtleties of AWS by developing
            serveless, single page web application.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
