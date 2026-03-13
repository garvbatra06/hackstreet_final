import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css';

/**
 * Timeline Component
 * Displays hackathon schedule events in a vertical timeline with scroll animations
 * 
 * @param {Array} items - Timeline events data
 * @param {string} className - Additional CSS classes
 */
const Timeline = ({ items = [], className = '' }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    // IntersectionObserver to trigger animations on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleItems((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);

  return (
    <section className={`timeline-container ${className}`} ref={timelineRef}>
      <div className="timeline-header">
        <h2 className="timeline-title">
          <span className="timeline-title-en">Event Timeline</span>
          <span className="timeline-title-jp">行程表</span>
        </h2>
      </div>

      <div className="timeline-wrapper">
        {/* Center vertical line */}
        <div className="timeline-line" />

        <ul className="timeline-list">
          {items.map((item, index) => (
            <li
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`timeline-item ${
                index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'
              } ${visibleItems.includes(index) ? 'timeline-item-visible' : ''}`}
            >
              {/* Timeline marker (circle on the line) */}
              <div className="timeline-marker">
                <span className="timeline-icon">{item.icon}</span>
              </div>

              {/* Event card */}
              <div className="timeline-card">
                <time className="timeline-date">{item.date}</time>
                <h3 className="timeline-event-title">{item.title}</h3>
                <p className="timeline-description">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;