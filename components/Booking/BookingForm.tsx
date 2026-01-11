"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./BookingForm.module.css";
import { Icon } from "../Icon/Icon";

export const BookingForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data:", { ...formData, date: startDate });
    // Тут буде логіка відправки на бекенд або через Zustand
  };

  return (
    <div className={styles.bookingCard}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name*"
          className={styles.input}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email*"
          className={styles.input}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Booking date*"
            className={styles.input}
            dateFormat="dd.MM.yyyy"
            required
            minDate={new Date()}
          />
          <Icon
            id="calendar"
            width={20}
            height={20}
            className={styles.calendarIcon}
          />
        </div>

        <textarea
          placeholder="Comment"
          className={styles.textarea}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        ></textarea>

        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
};
