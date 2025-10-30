'use client'

import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Bot,
  Brain,
  Mic,
  FileText,
  Image,
  BarChart3
} from 'lucide-react'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const stats = [
  {
    name: 'Active Projects',
    value: '12',
    change: '+2.5%',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'AI Tools Used',
    value: '25',
    change: '+8.2%',
    changeType: 'positive',
    icon: Bot,
  },
  {
    name: 'Processing Time Saved',
    value: '4.2h',
    change: '+12.3%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    name: 'Credits Remaining',
    value: '1,250',
    change: '-5.4%',
    changeType: 'negative',
    icon: Zap,
  },
]

const tools = [
  {
    name: 'Text Generation',
    description: 'Generate high-quality content using advanced AI models',
    icon: FileText,
    color: 'from-blue-400 to-blue-600',
    comingSoon: false,
  },
  {
    name: 'Image Analysis',
    description: 'Analyze and process images with computer vision',
    icon: Image,
    color: 'from-purple-400 to-purple-600',
    comingSoon: false,
  },
  {
    name: 'Speech Processing',
    description: 'Convert speech to text and text to speech',
    icon: Mic,
    color: 'from-green-400 to-green-600',
    comingSoon: true,
  },
  {
    name: 'Data Analytics',
    description: 'Extract insights from your data using AI',
    icon: BarChart3,
    color: 'from-orange-400 to-orange-600',
    comingSoon: true,
  },
  {
    name: 'Smart Assistant',
    description: 'Get AI-powered assistance for various tasks',
    icon: Brain,
    color: 'from-pink-400 to-pink-600',
    comingSoon: true,
  },
  {
    name: 'Custom Models',
    description: 'Train and deploy your own AI models',
    icon: Sparkles,
    color: 'from-indigo-400 to-indigo-600',
    comingSoon: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center py-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                AI Solutions Hub
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Hello {user?.name}! Discover the power of artificial intelligence with our comprehensive suite of AI tools and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Explore Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/subscription">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View Plans
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.name} className="glass-panel border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white/60">{stat.name}</p>
                          <p className="text-3xl font-bold text-white">{stat.value}</p>
                          <p className={`text-sm ${
                            stat.changeType === 'positive' 
                              ? 'text-green-400' 
                              : 'text-red-400'
                          }`}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white/80" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">AI Tools</h2>
              <Link href="/tools">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  View All Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-panel border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          {tool.comingSoon && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-white/60">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                          disabled={tool.comingSoon}
                        >
                          {tool.comingSoon ? 'Coming Soon' : 'Get Started'}
                          {!tool.comingSoon && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-panel border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">New Project</h3>
                  <p className="text-white/60 text-sm mb-4">Start a new AI-powered project</p>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
                    Create Project
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">View Analytics</h3>
                  <p className="text-white/60 text-sm mb-4">Check your usage and performance</p>
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Assistant</h3>
                  <p className="text-white/60 text-sm mb-4">Get help with your AI tasks</p>
                  <Button variant="ghost" className="text-green-400 hover:text-green-300">
                    Ask Assistant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}