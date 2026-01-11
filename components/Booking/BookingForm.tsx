"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import styles from "./BookingForm.module.css";

export const BookingForm = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Перевірка, чи обрано повний період
    if (!startDate || !endDate) {
      toast.error("Please select a booking period (start and end date)");
      return;
    }

    setIsSubmitting(true);

    try {
      // Імітація запиту до API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Booking Data:", {
        ...formData,
        startDate,
        endDate,
      });

      toast.success("Booking successful!");

      // Очищення форми без перезавантаження сторінки
      setFormData({ name: "", email: "", comment: "" });
      setDateRange([null, null]);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.bookingCard}>
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
          {/* 2. Налаштовуємо DatePicker для вибору діапазону */}
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date | null, Date | null]) => {
              setDateRange(update);
            }}
            placeholderText="Booking period*"
            className={styles.input}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            autoComplete="off"
            isClearable={true}
            required
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
