import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import swissAlps from "./assets/SwissAlps.jpeg";
import bali from "./assets/bali.jpeg";

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1800, // Slide every 2 seconds
  };

  const data = [
    {
      title: "Swiss Alps",
      imageUrl: swissAlps,
    },
    {
      title: "Bali",
      imageUrl: bali,
    },
    {
      title: "Bali",
      imageUrl: bali,
    },
    // ... add more items with image paths and descriptions as needed
  ];

  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <Card key={index} style={{ padding: "10px" }}>
          <CardMedia
            component="img"
            alt={item.title}
            height="700" // Adjust as needed
            width="100"
            image={item.imageUrl}
            // title={item.title}
          />
          {/* <Typography variant="h6">{item.title}</Typography> */}
        </Card>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
