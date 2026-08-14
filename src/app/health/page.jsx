async function getHealthData() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Health check request failed");
  }

  return response.json();
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Health Check</h1>

        <p className="mt-2 text-slate-400">
          Successfully fetched data from the health-check endpoint.
        </p>

        <pre className="mt-6 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 p-6 text-sm text-slate-200">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  );
}