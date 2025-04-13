import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const tutorialSections = [
  { id: "1", title: "Starting the Engine", description: "Learn the basics of starting your car's engine." },
  { id: "2", title: "Steering Techniques", description: "Master the art of steering with precision." },
  { id: "3", title: "Traffic Signals", description: "Understand and obey traffic signals for safe driving." },
  { id: "4", title: "Parking", description: "Learn how to park your car." },
];

export default function TutorialPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-dw-light-gray">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <h1 className="text-4xl font-bold">Driving Tutorial</h1>
        <p className="mt-3 text-2xl">Learn essential driving concepts.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {tutorialSections.map((section) => (
            <Card key={section.id} className="p-4">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.description}</p>
                <Link href={`/tutorial/${section.id}`}>
                  <Button className="w-full mt-4">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
