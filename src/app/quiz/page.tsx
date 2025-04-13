"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDatabase, ref, get } from "firebase/database";
import { firebaseApp } from "@/lib/firebase";
import Link from "next/link";

// Define the structure for a quiz question
interface QuizQuestion {
    id: string; // Changed to string to match Firebase key
    question: string;
}

export default function QuizPage() {
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            const db = getDatabase(firebaseApp);
            const quizRef = ref(db, 'quiz');

            try {
                const snapshot = await get(quizRef);
                if (snapshot.exists()) {
                    // Convert the snapshot to an array of questions
                    const data = snapshot.val();
                    const questionsList = Object.keys(data).map(key => ({
                        id: key,
                        question: data[key].question
                    }));
                    setQuizQuestions(questionsList);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
            }
        };

        fetchQuizQuestions();
    }, []);

    if (quizQuestions.length === 0) {
        return <div className="text-center">Loading quiz questions...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-dw-light-gray">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
                <h1 className="text-4xl font-bold">Driving Quiz</h1>
                <p className="mt-3 text-2xl">Test your driving knowledge with our multiple-choice quiz.</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                    {quizQuestions.map((question) => (
                        <Card key={question.id} className="p-4">
                            <CardHeader>
                                <CardTitle>{question.question}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    View question details and answer options.
                                </p>
                                <Link href={`/quiz/${question.id}`}>
                                    <Button className="w-full mt-4">View Details</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
