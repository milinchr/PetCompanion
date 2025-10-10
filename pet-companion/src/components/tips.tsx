import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import StarRating from "./star-rating";
import Slider from "react-slick";
import SortIcon from "@mui/icons-material/Sort";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Add from "./add";
import { useNavigate } from "react-router-dom";

// It's better to use interface in this case, because you are defining the shape of an object
type Tip = {
  id: number;
  author: string;
  category: string;
  rating: number;
  shortText: string;
  fullText: string;
};

const tips: Tip[] = [
  {
    id: 1,
    author: "Emma Roberts",
    category: "Dogs",
    rating: 4,
    shortText:
      "Always make sure your dog has fresh water and enough exercise daily...",
    fullText:
      "Always make sure your dog has fresh water and enough exercise daily. This helps prevent obesity and keeps them happy. Also, don’t forget regular vet check-ups!",
  },
  {
    id: 2,
    author: "John Smith",
    category: "Cats",
    rating: 5,
    shortText:
      "Cats love scratching posts, it helps them stay active and save your furniture...",
    fullText:
      "Cats love scratching posts, it helps them stay active and save your furniture. Place scratching posts in multiple locations where the cat usually spends time.",
  },
  {
    id: 3,
    author: "Sarah Johnson",
    category: "Parrots",
    rating: 3,
    shortText: "Birds need space to fly freely...",
    fullText:
      "Birds need space to fly freely. If kept in cages, ensure daily out-of-cage time in a safe environment to maintain their physical and mental health.",
  },
  {
    id: 4,
    author: "Michael Lee",
    category: "Dogs",
    rating: 4,
    shortText: "Use positive reinforcement when training...",
    fullText:
      "Always use positive reinforcement like treats and praise during dog training. It builds trust and creates a stronger bond between you and your dog.",
  },
  {
    id: 5,
    author: "Olivia Brown",
    category: "Cats",
    rating: 5,
    shortText: "Cats enjoy windows with views...",
    fullText:
      "Place a cat bed or perch near a window. Cats enjoy watching outside activity, which keeps them entertained and mentally stimulated.",
  },
  {
    id: 6,
    author: "Daniel White",
    category: "Dogs",
    rating: 4,
    shortText: "Regular walks prevent destructive behavior...",
    fullText:
      "Taking your dog for regular walks helps reduce destructive behavior at home. Physical activity is essential for their well-being.",
  },
  {
    id: 7,
    author: "Sophia Green",
    category: "Parrots",
    rating: 3,
    shortText: "Fresh fruits are healthy treats...",
    fullText:
      "Offer fresh fruits like apples, bananas, and berries to your birds. Avoid avocado and chocolate, as they are toxic to them.",
  },
  {
    id: 8,
    author: "James Wilson",
    category: "Cats",
    rating: 5,
    shortText: "Regular grooming keeps fur healthy...",
    fullText:
      "Brush your cat regularly to reduce shedding and hairballs. Long-haired cats especially need daily grooming to stay healthy.",
  },
  {
    id: 9,
    author: "Emily Davis",
    category: "Dogs",
    rating: 4,
    shortText: "Keep chew toys around...",
    fullText:
      "Chew toys help dogs reduce stress, clean their teeth, and prevent them from chewing on furniture.",
  },
  {
    id: 10,
    author: "David Martinez",
    category: "Cats",
    rating: 5,
    shortText: "Cats need vertical spaces...",
    fullText:
      "Install shelves or cat trees so cats can climb and observe their surroundings. It makes them feel safe and entertained.",
  },
  {
    id: 11,
    author: "Isabella Garcia",
    category: "Parrots",
    rating: 4,
    shortText: "Change water daily...",
    fullText:
      "Always change your birds’ water daily to keep it clean and fresh. Contaminated water can quickly harm their health.",
  },
  {
    id: 12,
    author: "William Thompson",
    category: "Dogs",
    rating: 5,
    shortText: "Socialization is key...",
    fullText:
      "Expose your dog to different people, places, and pets early on. Proper socialization helps prevent fear and aggression later in life.",
  },
];

export default function Tips() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<{ [key: number]: number | null }>({});
  const [category, setCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleRatingChange = (id: number, value: number | null) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  // Delete if not used
  const calculateAverage = (values: number[]) => {
    if (!values.length) return 0;
    const total = values.reduce((sum, val) => sum + val, 0);
    return (total / values.length).toFixed(1);
  };

  // Move to the top where all the consts are defined
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const filteredTips = category
    ? tips.filter((tip) => tip.category === category)
    : tips;

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // You can navigate directly in the onClick without defining a separate function
  const handleAddClick = () => {
    navigate("/create-tips");
  };

  return (
    <Box
      // Move to CSS or use styled-components
      sx={{
        height: "94vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        background: "#f6c4c0b4",
        py: 4,
        position: "relative",
      }}
    >
      <Box
        // Move to CSS or use styled-components
        sx={{
          position: "absolute",
          top: 20,
          right: 30,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton onClick={() => setShowFilter(!showFilter)}>
          <SortIcon />
        </IconButton>

        {showFilter && (
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Cats">Cat</MenuItem>
              <MenuItem value="Dogs">Dog</MenuItem>
              <MenuItem value="Hamsters">Hamster</MenuItem>
              <MenuItem value="Parrots">Parrot</MenuItem>
              <MenuItem value="Rabbits">Rabbit</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
      >
        <h1>🐾 Pet Care Tips</h1>
      </Typography>

      <Box
        // Move to CSS or use styled-components
        sx={{
          width: "90%",
          maxWidth: "1600px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Slider {...settings}>
          {filteredTips.map((tip) => (
            <Box key={tip.id} sx={{ px: 2 }}>
              <Card
                // Move to CSS or use styled-components
                sx={{
                  borderRadius: 4,
                  p: 3,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: 5,
                  backgroundColor: "#fff",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" gutterBottom>
                    {tip.author}
                  </Typography>

                  <Chip
                    label={tip.category}
                    // Move to CSS or use styled-components
                    sx={{
                      backgroundColor: "#828282",
                      mb: 1,
                      color: "white",
                      fontWeight: 500,
                    }}
                    size="small"
                  />

                  <Box sx={{ my: 1 }}>
                    <StarRating
                      value={ratings[tip.id] ?? 0}
                      onChange={(value) => handleRatingChange(tip.id, value)}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, mb: 2, px: 1 }}
                  >
                    {expanded === tip.id ? tip.fullText : tip.shortText}
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    // Move to CSS or use styled-components
                    sx={{
                      mt: 1,
                      borderRadius: 2,
                      backgroundColor: "#FF6F61",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#ff5a4d" },
                    }}
                    onClick={() => handleToggle(tip.id)}
                  >
                    {expanded === tip.id ? "See less" : "See more"}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
      <Add onClick={handleAddClick} />
    </Box>
  );
}
