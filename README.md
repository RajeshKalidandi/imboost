# AI Content Generator and Scheduler

## Description

This project is a Next.js-based web application that provides an AI-powered content generation and scheduling system for social media posts. It features a user-friendly dashboard with content generation, post scheduling, and analytics tracking capabilities.

## Features

- AI-powered content generation based on user-provided topics
- Post scheduling with date and time selection
- Analytics dashboard for tracking post performance
- User authentication and profile management
- Responsive design for desktop and mobile use

## Technologies Used

- Next.js 14
- React
- NextAuth.js for authentication
- Tailwind CSS for styling
- Recharts for data visualization
- OpenAI API for content generation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-content-scheduler.git
   cd ai-content-scheduler
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Log in or create an account.
2. Navigate to the "Generate Content" tab to create AI-generated content.
3. Use the "Schedule Post" tab to schedule your content for posting.
4. View analytics in the "Analytics" tab to track post performance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the AI content generation capabilities
- The Next.js team for the amazing framework
- All open-source contributors whose libraries made this project possible
