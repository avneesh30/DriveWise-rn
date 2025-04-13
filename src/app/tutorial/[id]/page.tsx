import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TutorialSectionProps {
  params: { id: string };
}

export default function TutorialDetailPage({ params }: TutorialSectionProps) {
  const { id } = params;

  // Dummy content for demonstration.  Replace with actual content loading.
  const tutorialContent = {
    "1": {
      title: "Starting the Engine",
      content: `Starting your car's engine is the first step to driving.  Make sure the car is in park or neutral, insert the key, and turn it clockwise.  Listen for the engine to start.`,
      image: "https://picsum.photos/600/400?random=1",
    },
    "2": {
      title: "Steering Techniques",
      content: `Proper steering is crucial for safe driving.  Keep both hands on the wheel, and use smooth, controlled movements.`,
      image: "https://picsum.photos/600/400?random=2",
    },
    "3": {
      title: "Traffic Signals",
      content: `Traffic signals are there to tell all drivers what to do.  A red light means stop; a green light means go; a yellow light means prepare to stop.`,
      image: "https://picsum.photos/600/400?random=3",
    },
        "4": {
      title: "Parking",
      content: `Parking can be tricky.  Make sure that you understand all the signs posted.`,
      image: "https://picsum.photos/600/400?random=4",
    },
  };

  const section = tutorialContent[id as keyof typeof tutorialContent] || {
    title: "Section Not Found",
    content: "Content for this section is not available.",
    image: "https://picsum.photos/600/400?random=5",
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-2 bg-dw-light-gray">
      <Card className="w-full max-w-3xl p-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{section.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img src={section.image} alt={section.title} className="rounded-md" />
          <p className="text-lg">{section.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
