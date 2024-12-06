"use client";

import { Job } from "@/types/job";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface FeaturedJobsSliderProps {
  jobs: Array<Job>;
}

const FeaturedJobsSlider = ({ jobs }: FeaturedJobsSliderProps) => {
  const [featuredJobs] = useState<Array<Job>>(jobs);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-12">
      <Slider {...settings} className="px-2">
        {featuredJobs.map((job: Job, index: number) => (
          <div key={index} className="px-1">
            <div className="border p-6 rounded-lg">
              {Object.entries(job)
                .filter(([key]) => key !== "id" && key !== "featured")
                .map(([key, value]) => (
                  <p
                    key={key}
                    className="text-sm text-ellipsis overflow-hidden whitespace-nowrap mb-2"
                  >
                    <strong className="capitalize">{key}:</strong>{" "}
                    <span>{String(value)}</span>
                  </p>
                ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedJobsSlider;
