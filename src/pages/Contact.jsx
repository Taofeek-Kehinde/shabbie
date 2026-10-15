import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../features/ui/uiSlice";

export default function Contact() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      dispatch(showToast("Please fill all fields"));
      return;
    }
    dispatch(showToast("Message sent! We'll reply soon 🙂"));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="page contact">
      <h1>Contact Us</h1>
      <p className="lead">
        Questions about an order, a custom blend, or wholesale? Reach out — we love to talk fragrance.
      </p>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={submit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Message
            <textarea
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?"
            />
          </label>
          <button className="btn-primary" type="submit">Send Message</button>
        </form>

        <aside className="contact-info">
          <h3>Get in touch</h3>
          <p> hello@shabbie.com</p>
          <p> +234 800 000 0000</p>
          <p> Lagos, Nigeria</p>
          <p className="hours">Mon – Fri · 9am – 6pm WAT</p>
        </aside>
      </div>
    </div>
  );
}