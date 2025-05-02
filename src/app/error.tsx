
'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md text-center border-destructive bg-card/80 backdrop-blur-md">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
            <AlertTriangle size={28} />
          </div>
          <CardTitle className="text-2xl font-semibold text-destructive">Something went wrong!</CardTitle>
          <CardDescription className="text-muted-foreground">
            We encountered an unexpected error. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Optionally display a simplified error message in development */}
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-2 whitespace-pre-wrap break-words rounded-md bg-muted p-4 text-left text-xs text-muted-foreground">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            variant="destructive"
            className="transform hover:scale-105 transition-transform"
          >
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
