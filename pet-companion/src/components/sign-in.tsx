import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from "../components/auth-context";
import { TextField, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

interface IFormData {
  username: string;
  password: string;
}

const SignInPage = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
  });

  const { login } = useAuth();

  const onSubmit = (data: IFormData) => {
    const success = login(data.username, data.password);
    if (!success) {
      alert('✖ Wrong username or password');
    }
  };

  return (
    <div className='Login-Page'>
      <Box display="flex" justifyContent="center" alignItems="center">
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
          <Typography variant="h5" textAlign="center" sx={{ fontFamily: "Poppins" }}>
            Welcome Back!
          </Typography>

          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Username" variant="outlined"
                error={!!errors.username}
                helperText={errors.username?.message} />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Password" type="password" variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message} />
            )}
          />

          <button className="btn btn-secondary" id="btn-login" type="submit"
            style={{ width: "50%", alignSelf: "center" }}>
            Sign In
          </button>
          <p>You don’t have an account? <Link to="/sign-up">Sign Up</Link></p>
        </Box>
      </Box>
    </div>
  );
};

export default SignInPage;