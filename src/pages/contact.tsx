import React, { useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Topbar from '@/components/Topbar/Topbar';
import Footer from '@/components/Footer';



const Contact=() => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE as string,
          process.env.NEXT_PUBLIC_TEMPLATE as string,
          form.current,
          process.env.NEXT_PUBLIC_EMAIL_KEY as string
        )
        .then(
          () => {
            toast.success('Email sent successfully!');
          },
          (error) => {
            toast.error('Something went wrong!', error.text);
            console.log(error);
          }
        );
    }
  };

  return (
    <>
      <Topbar/>
      <div className='flex justify-evenly items-center h-screen' style={{ background: '#001925' }}>
      <div className="form-container">
        <form className="forms" ref={form} onSubmit={sendEmail}>
          <span className="heading">Get in touch</span>
          <input placeholder="Name" type="text" className="input" name="from_name" />
          <input placeholder="Email" id="mail" name="user_email" type="email" className="input" />
          <textarea placeholder="Say Hello" rows={10} cols={30} id="message" name="message" className="textarea" />
          <div className="button-container">
            <button type="submit" className="send-button">
              Send
            </button>
          </div>
        </form>
      </div>

      <div className="section-banner">
        <div id="star-1">
          <div className="curved-corner-star">
            <div id="curved-corner-bottomright"></div>
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="curved-corner-star">
            <div id="curved-corner-topright"></div>
            <div id="curved-corner-topleft"></div>
          </div>
        </div>

        <div id="star-2">
          <div className="curved-corner-star">
            <div id="curved-corner-bottomright"></div>
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="curved-corner-star">
            <div id="curved-corner-topright"></div>
            <div id="curved-corner-topleft"></div>
          </div>
        </div>

        <div id="star-3">
          <div className="curved-corner-star">
            <div id="curved-corner-bottomright"></div>
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="curved-corner-star">
            <div id="curved-corner-topright"></div>
            <div id="curved-corner-topleft"></div>
          </div>
        </div>

        <div id="star-4">
          <div className="curved-corner-star">
            <div id="curved-corner-bottomright"></div>
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="curved-corner-star">
            <div id="curved-corner-topright"></div>
            <div id="curved-corner-topleft"></div>
          </div>
        </div>

        <div id="star-5">
          <div className="curved-corner-star">
            <div id="curved-corner-bottomright"></div>
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="curved-corner-star">
            <div id="curved-corner-topright"></div>
            <div id="curved-corner-topleft"></div>
          </div>
        </div>

        <div id="star-6">
          <div className="curved-corner-star">
            <div id="curved-corner-bottomright"></div>
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="curved-corner-star">
            <div id="curved-corner-topright"></div>
            <div id="curved-corner-topleft"></div>
          </div>
        </div>

        <div id="star-7">
          <div className="curved-corner-star">
            <div id="curved-corner-bottomright"></div>
            <div id="curved-corner-bottomleft"></div>
          </div>
          <div className="curved-corner-star">
            <div id="curved-corner-topright"></div>
            <div id="curved-corner-topleft"></div>
          </div>
        </div>
      </div>
     
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
