import React, { useState, useRef, useLayoutEffect } from "react";
import Footer from "../../components/Footer.jsx";
import { useReveal } from "../../hooks/useReveal.js";
import { usePageMeta } from "../../hooks/usePageMeta.js";
import "./Contact.css";

// 1. Go to https://web3forms.com  2. Enter mahmous2234@gmail.com  3. Copy the
// access key it emails you  4. Paste it here (replacing the text below).
const ACCESS_KEY = "91d82958-01be-4d15-b606-e9a8e3c9e5d8";

function Contact() {
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const pageRef = useRef(null);

  // Clear any leftover ScrollSmoother transform (from Projects) so this fixed
  // page measures against the viewport, not a transformed ancestor.
  useLayoutEffect(() => {
    ["#smooth-wrapper", "#smooth-content"].forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) el.style.transform = "";
    });
  }, []);

  useReveal(pageRef, [], { scroll: false }); // one-screen page → animate on mount
  usePageMeta(
    "Contact",
    "Get in touch with Mahmoud — let's build something together."
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("sending");

    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New message from your portfolio");
    data.append("from_name", "Portfolio Contact Form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="contact-page" ref={pageRef}>
      {/* blurred rectangle = soft glow */}
      <div className="contact-glow" aria-hidden="true"></div>
      <div className="contact-glow2" aria-hidden="true"></div>
      <div className="contact-glow3" aria-hidden="true"></div>

      <div className="contact-inner">
        {/* ---------- Left ---------- */}
        <div className="contact-left">
          <h1 className="contact-big" data-reveal="left">LETS BUILD</h1>
          <p className="contact-lead" data-reveal>
            Have a project in mind, or just want to say hi? Drop me a message
            and I&apos;ll get back to you soon.
          </p>
        </div>

        {/* ---------- Form ---------- */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-form__title" data-reveal="right">Contact</h2>

          <div className="contact-form__row" data-reveal>
            <input type="text" name="firstName" placeholder="Name*" required />
            <input type="text" name="lastName" placeholder="Name*" required />
          </div>

          <input type="email" name="email" placeholder="Email*" required data-reveal />

          <input
            type="text"
            name="source"
            placeholder="How did you hear about me?"
            data-reveal
          />

          <textarea name="message" placeholder="Message*" required data-reveal></textarea>

          {/* Honeypot — hidden field to trap spam bots. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex="-1"
            autoComplete="off"
            style={{ display: "none" }}
          />

          <button
            type="submit"
            className="contact-form__submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>

          {status === "sent" && (
            <p className="contact-form__status is-ok">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="contact-form__status is-err">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
