import React, { useEffect } from "react";

const Reels = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videos = Array.from({ length: 20 }).map((_, i) =>
    i % 2 === 0 ? "/video/reel1.mp4" : "/video/reel2.mp4"
  );

  const scrollLeft = () => {
    document.querySelector(".video-track").scrollBy({
      left: -320,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    document.querySelector(".video-track").scrollBy({
      left: 320,
      behavior: "smooth"
    });
  };

  const openModal = (video) => {
    const modal = document.getElementById("reelModal");
    const player = document.getElementById("reelPlayer");

    modal.style.display = "flex";

    player.src = video;
    player.muted = false;
    player.volume = 1;
    player.currentTime = 0;

    player.play();
  };

  const closeModal = () => {
    const modal = document.getElementById("reelModal");
    const player = document.getElementById("reelPlayer");

    modal.style.display = "none";
    player.pause();
  };

  return (
    <section className="video-section">

      <h2 className="video-title">Trending Looks</h2>

      <div className="video-slider">

        {/* LEFT */}
        <button className="video-arrow left" onClick={scrollLeft}>
          ‹
        </button>

        {/* RIGHT */}
        <button className="video-arrow right" onClick={scrollRight}>
          ›
        </button>

        <div className="video-track">

          {videos.map((video, i) => (
            <div
              className="video-card"
              key={i}
              onClick={() => openModal(video)}
            >
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          ))}

        </div>

      </div>

      {/* MODAL */}
      <div
        id="reelModal"
        className="reel-modal"
        onClick={(e) => {
          if (e.target.id === "reelModal") closeModal();
        }}
      >

        <span className="reel-close" onClick={closeModal}>
          ×
        </span>

        <video
          id="reelPlayer"
          className="reel-player"
          controls
        />

      </div>

    </section>
  );
};

export default Reels;