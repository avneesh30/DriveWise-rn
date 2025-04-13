import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-blue-500">DriveWise</span>!
        </h1>
        <p className="mt-3 text-2xl">
          Learn and test your driving knowledge with our interactive tutorial and quiz.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
          <Card className="w-full max-w-sm p-4">
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Login or signup to start learning and testing your driving skills.
              </p>
              <div className="mt-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full mb-2">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full">Signup</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm p-4">
            <CardHeader>
              <CardTitle>Driving Tutorial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interactive driving tutorial with multiple pages, each detailing a specific
                driving concept.
              </p>
              <Link href="/tutorial">
                <Button className="w-full mt-4">Start Tutorial</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm p-4">
            <CardHeader>
              <CardTitle>Driving Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Test your driving knowledge with our multiple-choice quiz.
              </p>
              <Link href="/quiz">
                <Button className="w-full mt-4">Take the Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
