import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Chip,} from "@mui/material";
import StarRating from "./StarRating";

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
    shortText: "Always make sure your dog has fresh water and enough exercise daily...",
    fullText:
      "Always make sure your dog has fresh water and enough exercise daily. This helps prevent obesity and keeps them happy. Also, don’t forget regular vet check-ups!",
  },
  {
    id: 2,
    author: "John Smith",
    category: "Cats",
    rating: 5,
    shortText: "Cats love scratching posts, it helps them stay active and save your furniture...",
    fullText:
      "Cats love scratching posts, it helps them stay active and save your furniture. Place scratching posts in multiple locations where the cat usually spends time.",
  },
  {
    id: 3,
    author: "Sarah Johnson",
    category: "Birds",
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
    category: "Birds",
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
    category: "Birds",
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
  const [ratings, setRatings] = useState<{ [key: number]: number | null }>({});

  const handleRatingChange = (id: number, value: number | null) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  const calculateAverage = (values: number[]) => {
    if (!values.length) return 0;
    const total = values.reduce((sum, val) => sum + val, 0);
    return (total / values.length).toFixed(1);
  };

  const [expanded, setExpanded] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Grid container spacing={3}>
      {tips.map((tip) => (
        <Grid key={tip.id} sx={{ flex: "1 1 300px", maxWidth: 400 }}>
          <Card sx={{ borderRadius: 3, p: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{tip.author}</Typography>
            
              <Chip label={tip.category} sx={{backgroundColor: "#828282",  mb: 1 }} color="primary" size="small" />

            
              <StarRating
                value={ratings[tip.id] ?? 0}
                onChange={(value) => handleRatingChange(tip.id, value)}
              />

           
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {expanded === tip.id ? tip.fullText : tip.shortText}
              </p>

              <Button variant="contained" size="small" sx={{ mt: 1, borderRadius: 2 , backgroundColor: "#FF6F61",}} onClick={() => handleToggle(tip.id)}>
                {expanded === tip.id ? "See less" : "See more"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}








