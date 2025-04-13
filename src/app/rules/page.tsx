"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RulesPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-2 bg-dw-light-gray">
      <Card className="w-full max-w-3xl p-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Rules of the Road</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Welcome to the Rules of the Road section! Here, you'll find essential guidelines
            for safe and responsible driving.
          </p>
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">General Rules</h2>
            <ul className="list-disc pl-5">
              <li>Always obey traffic signals and signs.</li>
              <li>Maintain a safe following distance.</li>
              <li>Drive at a speed appropriate for the conditions.</li>
              <li>Be aware of pedestrians and cyclists.</li>
            </ul>
          </section>

          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Specific Scenarios</h2>
            <p>
              <strong>Intersections:</strong> Yield to pedestrians and vehicles already in the
              intersection.
            </p>
            <p>
              <strong>Lane Changes:</strong> Use your turn signal and check your blind spots before
              changing lanes.
            </p>
            <p>
              <strong>Parking:</strong> Observe parking signs and regulations to avoid fines or
              towing.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
