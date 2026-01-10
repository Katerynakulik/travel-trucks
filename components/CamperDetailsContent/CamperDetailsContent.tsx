"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCamperStore } from "@/store/useCamperStore";
import { Icon } from "../Icon/Icon";
import styles from "./CamperDetailsContent.module.css";

interface CamperDetailsContentProps {
  id: string;
}

export default function CamperDetailsContent({
  id,
}: CamperDetailsContentProps) {
  const [activeTab, setActiveTab] = useState<"features" | "reviews">(
    "features"
  );

  // Стан для форми бронювання
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  // Отримуємо дані та екшени із Zustand
  const {
    currentCamper: camper,
    isLoading,
    fetchCamperById,
  } = useCamperStore();

  useEffect(() => {
    if (id) {
      fetchCamperById(id);
    }
  }, [id, fetchCamperById]);

  // Обробка відправки форми
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Емуляція успішного запиту
    toast.success("Booking request sent successfully!", {
      duration: 4000,
      position: "top-right",
    });

    // Очищення полів
    setFormData({ name: "", email: "", date: "", comment: "" });
  };

  if (isLoading)
    return <p className={styles.loader}>Loading camper details...</p>;
  if (!camper) return null;

  return (
    <div className={styles.wrapper}>
      {/* Title Section (Семантично коректно замість header) */}
      <div className={styles.titleSection}>
        <h1 className={styles.name}>{camper.name}</h1>
        <div className={styles.meta}>
          <span className={styles.rating}>
            <span className={styles.starEmoji}>⭐</span>
            {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles.location}>
            <Icon id="map" width={16} height={16} />
            {camper.location}
          </span>
        </div>
        <p className={styles.price}>€{Number(camper.price || 0).toFixed(2)}</p>
      </div>

      {/* Gallery Section */}
      <section className={styles.gallery}>
        {camper.gallery?.map((img: any, index: number) => (
          <div key={index} className={styles.imgWrapper}>
            <img
              src={img.original || img.thumb}
              alt={`${camper.name} view ${index + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </section>

      <p className={styles.description}>{camper.description}</p>

      {/* Tabs Navigation */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "features" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          type="button"
          className={`${styles.tab} ${
            activeTab === "reviews" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.bottomSection}>
        {/* Left Column: Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "features" ? (
            <div className={styles.featuresWrapper}>
              <div className={styles.featureTags}>
                <span className={styles.tag}>
                  <Icon id="diagram" width={20} height={20} />
                  {camper.transmission}
                </span>
                <span className={styles.tag}>
                  <Icon id="wind" width={20} height={20} />
                  AC
                </span>
                <span className={styles.tag}>
                  <Icon id="fuel-pump" width={20} height={20} />
                  {camper.engine}
                </span>
                {camper.kitchen && (
                  <span className={styles.tag}>
                    <Icon id="cup-hot" width={20} height={20} />
                    Kitchen
                  </span>
                )}
                {camper.radio && (
                  <span className={styles.tag}>
                    <Icon id="radio" width={20} height={20} />
                    Radio
                  </span>
                )}
              </div>

              <div className={styles.detailsTable}>
                <h3 className={styles.detailsTitle}>Vehicle details</h3>
                <hr className={styles.divider} />
                <div className={styles.detailRow}>
                  <span>Form</span>
                  <span className={styles.capitalize}>{camper.form}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.reviewsList}>
              {camper.reviews?.map((review: any, index: number) => (
                <div key={index} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>
                      {review.reviewer_name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className={styles.reviewerName}>
                        {review.reviewer_name}
                      </p>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={styles.star}>
                            {i < review.reviewer_rating ? "⭐" : "⚪"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Booking Form */}
        <aside className={styles.bookingFormWrapper}>
          <h3 className={styles.formTitle}>Book your campervan now</h3>
          <p className={styles.formSubtitle}>
            Stay connected! We are always ready to help you.
          </p>
          <form className={styles.form} onSubmit={handleBookingSubmit}>
            <input
              type="text"
              placeholder="Name*"
              className={styles.input}
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email*"
              className={styles.input}
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Booking date*"
              className={styles.input}
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <textarea
              placeholder="Comment"
              className={styles.textarea}
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            ></textarea>
            <button type="submit" className={styles.submitBtn}>
              Send
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
