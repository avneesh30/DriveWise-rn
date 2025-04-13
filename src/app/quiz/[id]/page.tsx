"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseApp } from "@/lib/firebase";

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

interface QuizDetailPageProps {
    params: { id: string };
}

export default function QuizDetailPage({ params }: QuizDetailPageProps) {
    const { id } = params;
    const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchQuizQuestion = async () => {
            const db = getDatabase(firebaseApp);
            const questionRef = ref(db, `quiz/${id}`);

            try {
                const snapshot = await get(questionRef);
                if (snapshot.exists()) {
                    // Ensure the ID is included in the fetched data
                    const data = snapshot.val();
                    setQuizQuestion({ ...data, id: id });
                } else {
                    console.log("No data available");
                    // Optionally, redirect to quiz list page or show an error message
                }
            } catch (error) {
                console.error("Error fetching quiz question:", error);
                // Optionally, redirect to quiz list page or show an error message
            }
        };

        fetchQuizQuestion();
    }, [id]);

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) {
            alert("Please select an answer.");
            return;
        }

        if (quizQuestion && selectedAnswer === quizQuestion.correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNextQuestion = () => {
        // For now, just go back to the quiz list page
        router.push('/quiz');
    };

    if (!quizQuestion) {
        return <div className="text-center">Loading question details...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen py-2 bg-dw-light-gray">
            <Card className="w-full max-w-3xl p-4">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{quizQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelection}>
                        {quizQuestion.options.map((option, index) => (
                            <div key={index} className="mb-2">
                                <RadioGroupItem value={option} id={`option-${index}`} className="mr-2" />
                                <label htmlFor={`option-${index}`} className="inline-flex items-center p-2 rounded-md text-sm font-medium hover:bg-secondary">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </RadioGroup>
                    <div className="flex justify-between">
                        <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                            Submit Answer
                        </Button>
                        <Button onClick={handleNextQuestion} variant="secondary">
                            Next Question
                        </Button>
                    </div>
                    {isCorrect !== null && (
                        <p className={isCorrect ? "text-green-500" : "text-red-500"}>
                            {isCorrect ? "Correct!" : "Incorrect. Please try again."}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
