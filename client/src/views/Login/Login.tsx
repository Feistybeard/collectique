import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLoginUserMutation } from '@/services/api';

export default function Login() {
  const { toast } = useToast();
  const [loginUser] = useLoginUserMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(email, password);

    try {
      setIsSubmitting(true);
      const response = await loginUser({ email, password }).unwrap();
      if (!response.success) {
        setIsSubmitting(false);
        toast({
          title: 'Error',
          description: response.message,
        });
        return;
      }

      toast({
        title: 'Login successful',
        description: 'You have successfully logged in',
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
        return;
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while trying to login, please try again later.',
        });
      }
    }
  };

  return (
    <>
      <h1>Collectique Login</h1>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='email'>Email</Label>
                </div>
                <Input id='email' type='email' name='email' required />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input id='password' type='password' name='password' required />
              </div>
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                Login
              </Button>
            </div>
            <Link to='#' className='ml-auto inline-block text-sm underline'>
              Forgot your password?
            </Link>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link to='/register' className='underline'>
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
