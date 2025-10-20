import React, { useState } from 'react'
import { Linkedin, Github } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // simple client-side behaviour: acknowledge subscription
    setSubscribed(true)
    setEmail('')
    // in a real app you'd POST to an API here
  }

  return (
    <footer className="bg-gray-900 text-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white">Job Portal</h3>
            <p className="mt-3 text-gray-300">Find your next opportunity. Connect with top recruiters and apply to jobs that match your skills.</p>
            <div className="mt-4 text-sm text-gray-400">© {new Date().getFullYear()} Job Portal. All rights reserved.</div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Jobs</a></li>
              <li><a href="#" className="hover:text-white">Companies</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Subscribe</h4>
            <p className="mt-2 text-gray-300">Get weekly job updates and career tips.</p>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none border border-gray-700"
              />
              <button type="submit" className="px-4 py-2 bg-[#6A38C2] text-white rounded-md hover:bg-[#5e2fb8]">{subscribed ? 'Subscribed' : 'Subscribe'}</button>
            </form>
            {subscribed && <div className="mt-2 text-sm text-green-400">Thanks — you'll receive updates soon.</div>}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div>Made with ❤️ · Contact: <a href="mailto:stackworksbyshibangini@gmail.com" className="hover:text-white">stackworksbyshibangini@gmail.com</a> · Stack Works by Shibangini, Kolkata, India</div>
          <div className="mt-3 md:mt-0 flex items-center gap-3">
            <span className="text-gray-400">Follow us:</span>
            <a href="https://www.linkedin.com/in/shibangini-kar-88a672380" target="_blank" rel="noreferrer" className="ml-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4 text-gray-200" aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </span>
            </a>
            <a href="https://github.com/Shibangini" target="_blank" rel="noreferrer" className="ml-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors">
                <Github className="h-4 w-4 text-gray-200" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer