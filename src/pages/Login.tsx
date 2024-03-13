import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import FormInput from '../components/inputs/FormInput';

// And now we can use these
const Login = () => {
  return (
    <div className='flex w-screen h-screen'>
        <div className='bg-primary w-1/3 h-screen'/>
        <div className='flex justify-center items-center w-2/3'>
            <div className='flex flex-col justify-center items-center w-[50%] h-max py-10 shadow-md'>
                <h1 className='text-[#1e3a8a] text-2xl font-bold tracking-widest'>Login</h1>
                <Formik
                    initialValues={{
                    password: '',
                    email: '',
                    }}
                    validationSchema={Yup.object({
                    password: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                    }}
                >
                    <Form className='flex flex-col justify-center items-center w-full'>

                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <Button type="submit" text='Login' className='btn-primary mt-3'/>
                    <p className='mt-4'>Don't have an account? <Link to={'/signup'} className='text-[#1e3a8a] mt-4'>SignUp</Link></p>
                    </Form>
                </Formik>
            </div>
        </div>
    </div>
  );
};

export default Login