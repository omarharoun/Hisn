import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Master{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Software Development
              </span>{' '}
              & IP Networking
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Interactive learning platform with structured roadmaps, hands-on labs, 
              and AI-driven insights to accelerate your tech career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/sign-up"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Start Learning Free
              </Link>
              <Link 
                href="/roadmaps"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Explore Roadmaps
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From beginner to expert, our platform provides all the tools and resources 
              to master modern technology skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Structured Roadmaps</h3>
              <p className="text-gray-600">
                Follow expertly crafted learning paths for software development and IP networking
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Hands-on Labs</h3>
              <p className="text-gray-600">
                Practice with real coding environments and networking simulations
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Interview Prep</h3>
              <p className="text-gray-600">
                Master technical interviews with our comprehensive question library
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">AI-Driven Insights</h3>
              <p className="text-gray-600">
                Stay ahead with trend analysis and personalized recommendations
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Live Environments</h3>
              <p className="text-gray-600">
                Spin up Docker containers and Kubernetes clusters on-demand
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Gamification</h3>
              <p className="text-gray-600">
                Earn badges, climb leaderboards, and track your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to accelerate your tech career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners who are mastering in-demand skills with SkillPath.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-purple-600 bg-white rounded-md hover:bg-gray-100"
            >
              Get Started Free
            </Link>
            <Link 
              href="/roadmaps"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-md hover:bg-white hover:text-purple-600"
            >
              Explore Roadmaps
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}