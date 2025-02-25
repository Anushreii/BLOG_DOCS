import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-6 text-center">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-md ">
        Explore a collection of coding projects that showcase various technologies, frameworks, and best practices.
        Each project is designed to help developers learn and grow while building real-world applications.
      </p>
      <p className="text-md ">
        From full-stack web apps to small interactive components, our projects cover a wide range of topics in modern development.
        Stay tuned for tutorials and guides on how these projects are built!
      </p>
      <CallToAction />
    </div>
  );
}
