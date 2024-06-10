import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useRegisterUserMutation } from '@/services/api';

export default function RegisterForm() {
  const { toast } = useToast();
  const [registerUser] = useRegisterUserMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordRetype = formData.get('password-retype') as string;

    if (password !== passwordRetype) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure the passwords match',
      });
      setIsSubmitting(false);
      return;
    }

    const newUser = {
      email,
      password,
      role: 'user',
    };

    try {
      const response = await registerUser(newUser).unwrap();
      if (!response.success) {
        toast({
          title: 'Error',
          description: response.message,
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: 'Account created',
        description:
          'You have successfully created an account, you will be redirected to the login page.',
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error: any) {
      setIsSubmitting(false);
      if (error.data) {
        toast({
          title: 'Error',
          description: error.data.message,
        });
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred, please try again later.',
        });
      }
    }
  };

  return (
    <>
      <h1>Collectique Register</h1>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} className='grid gap-4'>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='email'>Email</Label>
                </div>
                <Input id='email' name='email' type='email' required />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input id='password' name='password' type='password' required />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password-retype'>Retype password</Label>
                </div>
                <Input id='password-retype' name='password-retype' type='password' required />
              </div>
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                Create an account
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <Link to='/' className='underline'>
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
