"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

import styles from "./BookingForm.module.css";
import { Icon } from "../Icon/Icon";

export const BookingForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проста валідація дати (DatePicker required не завжди спрацьовує візуально)
    if (!startDate) {
      toast.error("Please select a booking date");
      return;
    }

    setIsSubmitting(true);

    try {
      // Імітація запиту до API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Booking Data:", { ...formData, date: startDate });

      // Повідомлення про успіх
      toast.success("Booking successful! We will contact you soon.");

      // Очищення форми
      setFormData({ name: "", email: "", comment: "" });
      setStartDate(null);
      (e.target as HTMLFormElement).reset();

      // Перезавантаження сторінки (якщо потрібно за ТЗ)
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.bookingCard}>
      {/* Контейнер для сповіщень */}
      <Toaster position="top-center" reverseOrder={false} />

      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name*"
          className={styles.input}
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email*"
          className={styles.input}
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            placeholderText="Booking date*"
            className={styles.input}
            dateFormat="dd.MM.yyyy"
            required
            minDate={new Date()}
            autoComplete="off"
          />
        </div>

        <textarea
          placeholder="Comment"
          className={styles.textarea}
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
        ></textarea>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};
