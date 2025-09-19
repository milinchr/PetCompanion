import React, { useState } from "react";
import Rating from "@mui/material/Rating";

type StarRatingProps = {
  value: number | null;
  onChange: (newValue: number | null) => void;
};

export default function StarRating({ value, onChange }: StarRatingProps) {
  return (
    <div>
      <Rating
        name="user-rating"
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
      />
    </div>
  );
}

