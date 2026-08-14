export default async function MovieDetailsPage({ params }) {
    const { id } = await params;
  
    return (
      <main>
        <h1>Movie Details</h1>
        <p>Movie ID: {id}</p>
      </main>
    );
  }