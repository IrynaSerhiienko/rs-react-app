import { Title } from '../../components/title/title';

export function AboutPage() {
  const info = {
    name: 'Irina',
    role: 'Frontend Developer',
    github: 'https://github.com/IrynaSerhiienko',
    linkedin: 'https://www.linkedin.com/in/irynaserhiienko/',
    photo: 'https://avatars.githubusercontent.com/u/108522040?v=4',
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-2xl space-y-8 border border-gray-100">
      <Title
        level={1}
        className="text-4xl font-bold text-primary border-b pb-2"
      >
        About
      </Title>

      <div className="flex items-center gap-6">
        <img
          src={info.photo}
          alt={info.name}
          className="rounded-full h-30 w-30 object-cover border-1 border-primary shadow-md"
        />
        <div>
          <Title level={2} className="text-2xl font-semibold text-primary">
            {info.name}
          </Title>
          <p className="text-base text-muted-foreground italic">{info.role}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={info.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transition duration-300 hover:drop-shadow-[0_0_4px_#FFDA1F] hover:opacity-70"
        >
          <img src="/github.svg" alt="GitHub" className="w-6 h-6" />
        </a>

        <a
          href={info.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition duration-300 hover:drop-shadow-[0_0_4px_#FFDA1F] hover:opacity-70"
        >
          <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
        </a>
      </div>

      <p className="text-base text-gray-700 leading-relaxed">
        Learn React at{' '}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 font-medium"
        >
          RS School React Course
        </a>
        , where practical skills and real-world tasks help you grow as a
        developer.
      </p>
    </div>
  );
}
