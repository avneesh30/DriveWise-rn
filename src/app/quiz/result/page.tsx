"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the structure for a quiz question
interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

export default function QuizResultPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const score = searchParams.get('score');
    const total = searchParams.get('total');
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        // Load quiz questions from a JSON file
        const loadQuizQuestions = async () => {
            try {
                const response = await fetch("/quiz_questions.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: QuizQuestion[] = await response.json();
                setQuizQuestions(data);
            } catch (error) {
                console.error("Could not load quiz questions:", error);
                // Optionally, set an error state to display a message to the user
            }
        };

        loadQuizQuestions();
    }, []);

    const handleRetakeQuiz = () => {
        router.push("/quiz");
    };

    if (!score || !total) {
        return <div className="text-center">Error: Score or total not found.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-dw-light-gray">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
                <h1 className="text-4xl font-bold">Quiz Results</h1>
                <p className="mt-3 text-2xl">Your Score: {score} / {total}</p>
                  {quizQuestions.map((question) => (
                      <Card key={question.id} className="w-full max-w-3xl p-4 mt-4">
                          <CardHeader>
                              <CardTitle>{question.question}</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <p>Correct Answer: {question.correctAnswer}</p>
                              {/* You might want to show user's answer here if you stored it */}
                          </CardContent>
                      </Card>
                  ))}
                <div className="mt-6">
                    <Button onClick={handleRetakeQuiz} variant="secondary">Retake Quiz</Button>
                </div>
            </main>
        </div>
    );
}
