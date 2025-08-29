import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from "../components/auth-context";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup.string().required('First name is required'),
    petName: yup.string().required('Pet name is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string().required("Please confirm your password")
        .oneOf([yup.ref("password"), ""], "Passwords do not match")
});

interface IFormData {
    username: string;
    petName: string;
    password: string;
    confirmPassword: string;
}

const LoginPage = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<IFormData>({
        resolver: yupResolver(validationSchema),
    });

    const { login } = useAuth();

    const onSubmit = (data: IFormData) => {
        login();
    };

    return (
        <div className="form-container">
            <form className="centred-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <Controller name="username" control={control} defaultValue=""
                        render={({ field }) => (
                            <div>
                                <input {...field} />
                                {errors.username && <p className='error'>{errors.username.message}</p>}
                            </div>
                        )} />
                </div>

                <div>
                    <label>Pet Name</label>
                    <Controller name="petName" control={control} defaultValue=""
                        render={({ field }) => (
                            <div>
                                <input {...field} />
                                {errors.petName && <p className='error'>{errors.petName.message}</p>}
                            </div>
                        )} />
                </div>

                <div>
                    <label>Password</label>
                    <Controller name="password" control={control} defaultValue=""
                        render={({ field }) => (
                            <div>
                                <input type="password" {...field} />
                                {errors.password && <p className='error'>{errors.password.message}</p>}
                            </div>
                        )} />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <Controller name="confirmPassword" control={control} defaultValue=""
                        render={({ field }) => (
                            <div>
                                <input type="password" {...field} />
                                {errors.confirmPassword && <p className='error'>{errors.confirmPassword.message}</p>}
                            </div>
                        )} />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;