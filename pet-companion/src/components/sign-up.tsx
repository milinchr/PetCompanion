import { Controller, useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from "./auth-context";
import { TextField, Box, Typography } from '@mui/material';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    petName: yup.string().required('Pet name is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password'), ''], 'Passwords do not match')
});

interface IFormData {
    username: string;
    petName: string;
    password: string;
    confirmPassword: string;
}

const SignUp = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<IFormData>({
        resolver: yupResolver(validationSchema),
    });

    const { login } = useAuth();

    const onSubmit = (data: IFormData) => {
        login(data.username, data.petName, data.password);
    };

    return (
        <div className='Login-Page'>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    width="450px"
                    sx={{
                        backgroundColor: '#FFFFFF',
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        borderColor: '#E0E0E0',
                    }}
                >
                    <Typography variant="h5" textAlign="center" 
                    sx={{
                        fontFamily: "Poppins"
                    }}>Create Account</Typography>

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

                    <button className="btn btn-secondary" id="btn-login" type="submit" style={{width:"50%", alignSelf:"center"}}>
                        Sign Up
                    </button>
                    <p>You have already an account? <Link to="/sign-in">Sign In</Link></p>
                </Box>
            </Box>
        </div>
    );
};

export default SignUp;