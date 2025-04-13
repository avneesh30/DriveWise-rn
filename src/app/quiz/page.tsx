"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the structure for a quiz question
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage() {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const router = useRouter();

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

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer.");
      return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

    const goToResults = () => {
      router.push(`/quiz/result?score=${score}&total=${quizQuestions.length}`);
    };

  if (quizQuestions.length === 0) {
    return <div className="text-center">Loading quiz questions...</div>;
  }

  if (quizCompleted) {
      return (
          <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-dw-light-gray">
              <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
                  <h1 className="text-4xl font-bold">Quiz Completed!</h1>
                  <p className="mt-3 text-2xl">Your Score: {score} / {quizQuestions.length}</p>
                  <div className="mt-6">
                      <Button onClick={goToResults} className="mr-4">View Results</Button>
                      <Button onClick={handleRetakeQuiz} variant="secondary">Retake Quiz</Button>
                  </div>
              </main>
          </div>
      );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen py-2 bg-dw-light-gray">
      <Card className="w-full max-w-3xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Question {currentQuestionIndex + 1} / {quizQuestions.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{currentQuestion.question}</p>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelection}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-2">
                <RadioGroupItem value={option} id={`option-${index}`} className="mr-2" />
                <label htmlFor={`option-${index}`} className="inline-flex items-center p-2 rounded-md text-sm font-medium hover:bg-secondary">
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="w-full">
            {currentQuestionIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
