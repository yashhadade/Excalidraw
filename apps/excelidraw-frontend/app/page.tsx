'use client';

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Pencil, Users, Zap, Share2 } from "lucide-react";
import Link from "next/link";
// import { AuthDialog } from "@/components/auth-dialog";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-sm border-zinc-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Whiteboard</span>
            </div>
            <div className="flex items-center gap-4">
            <Link href={"/signin"}>
                <Button variant={"outline"} size="lg" className="border-zinc-700 rounded-md
              pl-4 pr-4 pt-2 pb-2 text-white hover:bg-zinc-800">
                  Sign in
                  {/* <Pencil className="ml-2 h-4 w-4" /> */}
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="border-zinc-700 rounded-md
               pl-4 pr-4 pt-2 pb-2 text-white hover:bg-zinc-800">
                  Sign up
                </Button>
              </Link>
              {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Collaborative Whiteboarding
              <br />
              <span className="text-blue-500">Made Simple</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Create, collaborate, and bring your ideas to life with our intuitive whiteboarding platform.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group p-2">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
              <Button size="lg" variant="outline" className="border-zinc-700 rounded-md
              p-2 text-white hover:bg-zinc-800">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-zinc-900 border-zinc-800 rounded-2xl ">
                <Pencil className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Intuitive Drawing Tools</h3>
                <p className="text-zinc-400">
                  Powerful yet simple tools that make digital drawing feel natural and effortless.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-zinc-900 border-zinc-800 rounded-2xl">
                <Users className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Real-time Collaboration</h3>
                <p className="text-zinc-400">
                  Work together with your team in real-time, no matter where they are.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow bg-zinc-900 border-zinc-800 rounded-2xl">
                <Share2 className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Easy Sharing</h3>
                <p className="text-zinc-400">
                  Share your whiteboards with a single click and collaborate seamlessly.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-blue-800 border-0 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Collaboration?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Join thousands of teams already using our platform to bring their ideas to life.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 group p-2">
              Start Whiteboarding Now
              <Zap className="ml-2 h-4 w-4 group-hover:rotate-12 transition" />
            </Button>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}