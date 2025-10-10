import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "./auth-context";
import { TextField, Box, Typography } from "@mui/material";
import React, { useState } from "react";

const pets = [
  { id: "cat", name: "Cat" },
  { id: "dog", name: "Dog" },
  { id: "hamster", name: "Hamster" },
  { id: "parrot", name: "Parrot" },
  { id: "rabbit", name: "Rabbit" },
];

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

// Rename the interface to avoit I prefix
interface IFormData {
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
  } = useForm<IFormData>({
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
    // The issue is that you are calling handleSubmit(onSubmit)()
    // inside the handleSignUp function, which is not the recommended way to trigger
    // form submission from a custom handler;
    // instead, you should call handleSubmit(onSubmit) directly as a function,
    //  or better move your validation logic into the onSubmit handler and call it only once.
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data: IFormData) => {
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
              {/* I would suggest to extract the repeated code for Controller into a separate component to reduce redundancy
            and pass the different values as props */}
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
                className="btn btn-secondary"
                type="button"
                id="btn-login"
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
              <Controller
                name="treat"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Favorite Treat"
                    variant="outlined"
                    error={!!errors.treat}
                    helperText={errors.treat?.message}
                  />
                )}
              />

              <Controller
                name="age"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pet Age"
                    variant="outlined"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                )}
              />

              <Controller
                name="color"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fur Color"
                    variant="outlined"
                    error={!!errors.color}
                    helperText={errors.color?.message}
                  />
                )}
              />

              <Controller
                name="eyes"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Eye Color"
                    variant="outlined"
                    error={!!errors.eyes}
                    helperText={errors.eyes?.message}
                  />
                )}
              />

              <Box display="flex" justifyContent="space-between" mt={2}>
                <button
                  className="btn btn-secondary"
                  id="btn-skip"
                  type="button"
                  style={{ width: "47%", fontWeight: "bold" }}
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  className="btn btn-secondary"
                  id="btn-login"
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
