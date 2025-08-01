// Main file: QuizApp.jsx

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const quizBank = {
  "NSS Day": [
    {
      question: "What is the full form of NSS?",
      options: ["National Social Service", "National Service Scheme", "New Student Society", "None of the above"],
      answer: 1,
    },
    {
      question: "When is NSS Day celebrated?",
      options: ["15 August", "24 September", "1 October", "26 January"],
      answer: 1,
    },
    {
      question: "What is the NSS motto?",
      options: ["Service to All", "Not Me But You", "Serve and Obey", "We the People"],
      answer: 1,
    },
  ],
  "Environment Day": [
    {
      question: "When is World Environment Day celebrated?",
      options: ["5 June", "22 April", "1 May", "15 July"],
      answer: 0,
    },
    {
      question: "What is the theme of Environment Day 2023?",
      options: ["Beat Plastic Pollution", "Green Earth", "Plant More Trees", "Go Green"],
      answer: 0,
    },
  ],
};

export default function QuizApp() {
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("NSS Day");
  const [step, setStep] = useState("email");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const questions = quizBank[event] || [];

  const handleSubmit = () => {
    let correct = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].answer) correct++;
    });
    setScore(correct);
    setStep("result");
  };

  const downloadCertificate = () => {
    const certText = `\nCertificate of Achievement\n\nThis is to certify that the student with email ${email} has successfully completed the '${event}' Quiz with a score of ${score}/${questions.length}.\n\nNSS DAVIET`;
    const blob = new Blob([certText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificate_${email}_${event.replace(/\s+/g, "_")}.txt`;
    a.click();
  };

  if (step === "email") {
    return (
      <Card className="max-w-md mx-auto mt-10 p-4">
        <CardContent>
          <h2 className="text-xl mb-4">Enter Your Email to Start Quiz</h2>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="mt-4"
            placeholder="Enter event name (e.g. NSS Day, Environment Day)"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
          <Button className="mt-4 w-full" onClick={() => setStep("quiz")}>Start Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  if (step === "quiz") {
    return (
      <Card className="max-w-xl mx-auto mt-10 p-4">
        <CardContent>
          <h2 className="text-lg font-bold mb-4">{event} Quiz</h2>
          {questions.map((q, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-medium">Q{index + 1}: {q.question}</h3>
              {q.options.map((option, i) => (
                <div key={i}>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={i}
                      onChange={() => {
                        const updated = [...answers];
                        updated[index] = i;
                        setAnswers(updated);
                      }}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          ))}
          <Button className="mt-4 w-full" onClick={handleSubmit}>Submit Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  if (step === "result") {
    const percentage = (score / questions.length) * 100;
    return (
      <Card className="max-w-md mx-auto mt-10 p-4 text-center">
        <CardContent>
          <h2 className="text-xl">Your Score: {score}/{questions.length}</h2>
          <p className="my-4">Percentage: {percentage.toFixed(2)}%</p>
          {percentage >= 70 ? (
            <>
              <p className="text-green-600 font-bold">Congratulations! You qualified for the certificate.</p>
              <Button className="mt-4" onClick={downloadCertificate}>Download Certificate</Button>
            </>
          ) : (
            <p className="text-red-600 font-semibold">Sorry, you did not qualify for a certificate.</p>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}
