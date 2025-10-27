import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "./auth-context";
import { TextField, Box, Typography, MenuItem } from "@mui/material";
import React, { useState } from "react";
import "../styles/sign-up.css";

const pets = [
  { id: "cat", name: "Cat" },
  { id: "dog", name: "Dog" },
  { id: "hamster", name: "Hamster" },
  { id: "parrot", name: "Parrot" },
  { id: "rabbit", name: "Rabbit" },
];

const petOptions = {
  cat: {
    treat: ["Tuna", "Chicken", "Salmon", "Catnip"],
    age: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
      "18", "19", "20"],
    color: ["White", "Black", "Orange", "Gray", "Calico"],
    eyes: ["Green", "Blue", "Amber", "Yellow"],
  },
  dog: {
    treat: ["Bone", "Biscuit", "Beef", "Peanut Butter"],
    age: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
      "18", "19", "20"],
    color: ["Brown", "Black", "Golden", "White", "Gray"],
    eyes: ["Brown", "Blue", "Hazel"],
  },
  hamster: {
    treat: ["Seeds", "Sunflower", "Apple", "Carrot"],
    age: ["0.5", "1", "2", "3", "4"],
    color: ["Golden", "White", "Gray", "Black"],
    eyes: ["Black", "Red"],
  },
  parrot: {
    treat: ["Seeds", "Apple", "Berry", "Nuts"],
    age: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
      "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    color: ["Green", "Blue", "Red", "Yellow", "Multicolor"],
    eyes: ["Orange", "Brown", "Black"],
  },
  rabbit: {
    treat: ["Carrot", "Apple", "Leafy Greens", "Pellets"],
    age: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    color: ["White", "Brown", "Gray", "Black"],
    eyes: ["Red", "Brown", "Blue"],
  },
} as const;

type PetType = keyof typeof petOptions;
type PetField = keyof (typeof petOptions)["cat"];

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  petName: yup.string().required("Pet name is required"),
  petType: yup.string().required("Please select a pet type"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "At least one uppercase letter required")
    .matches(/[a-z]/, "At least one lowercase letter required")
    .matches(/\d/, "At least one digit required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  treat: yup.string().required("Favorite treat is required"),
  age: yup.string().required("Pet age is required"),
  color: yup.string().required("Pet color is required"),
  eyes: yup.string().required("Eye color is required"),
});

interface FormData {
  username: string;
  petName: string;
  petType: string;
  password: string;
  confirmPassword: string;
  treat: string;
  age: string;
  color: string;
  eyes: string;
}

const SignUp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  const { login } = useAuth();
  const [step, setStep] = useState(1);

  const checkUsernameExists = (username: string) =>
    !!localStorage.getItem(username);

  const handleNextStep = async () => {
    const isValid = await trigger([
      "username",
      "petName",
      "password",
      "confirmPassword",
      "petType",
    ]);

    const username = getValues("username");

    if (!isValid) return;

    if (checkUsernameExists(username)) {
      alert("✖ Username already exists");
      return;
    }

    setStep(2);
  };

  const handleSignUp = async () => {
    const isValid = await trigger(["treat", "age", "color", "eyes"]);
    if (!isValid) return;
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: FormData) => {
    const success = login(
      data.username,
      data.password,
      data.petName,
      data.petType,
      data.treat,
      data.age,
      data.color,
      data.eyes
    );

    if (!success) {
      alert("✖ Registration failed. Check your credentials");
    } else {
      alert("✔ Account created successfully!");
    }
  };

  return (
    <div className="Login-Page">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
          width="450px"
          sx={{
            backgroundColor: "#FFFFFF",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontFamily: "Poppins" }}
          >
            {step === 1 ? "Create Account" : "Pet Details"}
          </Typography>

          {step === 1 && (
            <>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="petName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pet Name"
                    variant="outlined"
                    error={!!errors.petName}
                    helperText={errors.petName?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />

              <Controller
                name="petType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <label
                      style={{
                        marginBottom: "2px",
                        fontWeight: "500",
                      }}
                    >
                      Which pet do you have at home?
                    </label>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Pet options"
                    >
                      {pets.map((pet) => (
                        <React.Fragment key={pet.id}>
                          <input
                            type="radio"
                            className="btn-check"
                            id={pet.id}
                            value={pet.id}
                            checked={field.value === pet.id}
                            onChange={() => field.onChange(pet.id)}
                          />
                          <label
                            className="btn btn-outline-secondary"
                            htmlFor={pet.id}
                          >
                            {pet.name}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    {errors.petType && (
                      <div className="invalid-feedback d-block text-center">
                        {errors.petType.message}
                      </div>
                    )}
                  </div>
                )}
              />

              <button
                className="btn btn-secondary btn-login"
                type="button"
                style={{ width: "50%", alignSelf: "center" }}
                onClick={handleNextStep}
              >
                Continue →
              </button>

              <p style={{ textAlign: "center" }}>
                Already have an account? <Link to="/sign-in">Sign In</Link>
              </p>
            </>
          )}

          {step === 2 && (
  <>
    {(["treat", "age", "color", "eyes"] as PetField[]).map((fieldName) => {
      const petType = getValues("petType") as PetType | undefined;
      const options = petType ? petOptions[petType]?.[fieldName] : null;
      const labelMap: Record<PetField, string> = {
        treat: "Favorite Treat",
        age: "Pet Age",
        color: "Fur Color",
        eyes: "Eye Color",
      };

      return (
        <Controller
          key={fieldName}
          name={fieldName as keyof FormData}
          control={control}
          defaultValue=""
          render={({ field }) =>
            options ? (
              <TextField
                {...field}
                select
                label={labelMap[fieldName]}
                variant="outlined"
                error={!!errors[fieldName as keyof FormData]}
                helperText={errors[fieldName as keyof FormData]?.message}
              >
                {options.map((opt: string) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                {...field}
                label={labelMap[fieldName]}
                variant="outlined"
                error={!!errors[fieldName as keyof FormData]}
                helperText={errors[fieldName as keyof FormData]?.message}
              />
            )
          }
        />
      );
    })}

    <Box display="flex" justifyContent="space-between" mt={2}>
      <button
        className="btn btn-secondary btn-skip"
        id=""
        type="button"
        style={{ width: "47%", fontWeight: "bold" }}
        onClick={() => setStep(1)}
      >
        ← Back
      </button>
      <button
        className="btn btn-secondary btn-login"
        type="button"
        style={{ width: "47%" }}
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </Box>
  </>
)}

        </Box>
      </Box>
    </div>
  );
};

export default SignUp;
