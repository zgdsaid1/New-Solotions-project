'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FileText, 
  Image, 
  Mic, 
  BarChart3, 
  Brain, 
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Star,
  Clock,
  Bot
} from 'lucide-react'

import ProtectedRoute from '@/components/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = [
  'All Tools',
  'Text & Writing',
  'Image & Vision',
  'Audio & Speech',
  'Data & Analytics',
  'AI Assistants',
]

const tools = [
  {
    name: 'Ask HuBi',
    description: 'Chat with HuBi, your intelligent AI assistant for platform questions, pricing, and support',
    icon: Bot,
    color: 'from-blue-400 to-blue-600',
    category: 'AI Assistants',
    rating: 4.8,
    uses: '1.2M',
    comingSoon: false,
    featured: true,
    href: '/tools/hubi'
  },
  {
    name: 'Text Generator',
    description: 'Generate high-quality content with AI. Export to PDF/Word and copy easily.',
    icon: FileText,
    color: 'from-green-400 to-green-600',
    category: 'Text & Writing',
    rating: 4.9,
    uses: '950K',
    comingSoon: false,
    featured: true,
    href: '/tools/text-generator'
  },
  {
    name: 'Smart Image Analysis',
    description: 'Analyze images, detect objects, read text, and extract insights from visual content',
    icon: Image,
    color: 'from-purple-400 to-purple-600',
    category: 'Image & Vision',
    rating: 4.9,
    uses: '856K',
    comingSoon: false,
    featured: true,
    href: undefined
  },
  {
    name: 'Voice to Text',
    description: 'Convert speech to text with high accuracy and support for multiple languages',
    icon: Mic,
    color: 'from-green-400 to-green-600',
    category: 'Audio & Speech',
    rating: 4.7,
    uses: '634K',
    comingSoon: true,
    href: undefined,
    featured: false,
  },
  {
    name: 'Data Insights',
    description: 'Extract meaningful insights and patterns from your data using AI analytics',
    icon: BarChart3,
    color: 'from-orange-400 to-orange-600',
    category: 'Data & Analytics',
    rating: 4.6,
    uses: '445K',
    comingSoon: true,
    featured: false,
    href: undefined
  },
  {
    name: 'AI Assistant',
    description: 'Get help with various tasks using our intelligent AI assistant',
    icon: Brain,
    color: 'from-pink-400 to-pink-600',
    category: 'AI Assistants',
    rating: 4.9,
    uses: '2.1M',
    comingSoon: true,
    featured: true,
    href: undefined
  },
  {
    name: 'Content Optimizer',
    description: 'Optimize your content for SEO and readability with AI-powered suggestions',
    icon: Sparkles,
    color: 'from-indigo-400 to-indigo-600',
    category: 'Text & Writing',
    rating: 4.5,
    uses: '378K',
    comingSoon: true,
    featured: false,
    href: undefined
  },
  {
    name: 'Image Generator',
    description: 'Create stunning images and artwork from text descriptions',
    icon: Image,
    color: 'from-rose-400 to-rose-600',
    category: 'Image & Vision',
    rating: 4.8,
    uses: '923K',
    comingSoon: true,
    featured: false,
    href: undefined
  },
  {
    name: 'Code Assistant',
    description: 'Get help with coding, debugging, and code optimization',
    icon: Brain,
    color: 'from-teal-400 to-teal-600',
    category: 'AI Assistants',
    rating: 4.7,
    uses: '567K',
    comingSoon: true,
    featured: false,
    href: undefined
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

export default function ToolsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Tools &{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto">
              Discover our comprehensive suite of AI-powered tools designed to enhance your productivity and creativity.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Card className="glass-panel border-white/10 mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      placeholder="Search tools..."
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-white/60" />
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={category === 'All Tools' ? 'default' : 'outline'}
                          size="sm"
                          className={category === 'All Tools' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                            : 'border-white/20 text-white/80 hover:bg-white/10'
                          }
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Tools */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6">Featured Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {tools.filter(tool => tool.featured).map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-panel border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex flex-col items-end">
                            {tool.comingSoon && (
                              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full mb-2">
                                Coming Soon
                              </span>
                            )}
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-white/60">{tool.rating}</span>
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-white/60 text-sm">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{tool.uses} uses</span>
                          </div>
                          <span className="text-xs bg-white/10 px-2 py-1 rounded">
                            {tool.category}
                          </span>
                        </div>
                        {tool.href && !tool.comingSoon ? (
                          <Link href={tool.href}>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-between text-white/80 hover:text-white hover:bg-white/10"
                            >
                              Try Now
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        ) : (
                          <Button 
                            variant="ghost" 
                            className="w-full justify-between text-white/80 hover:text-white hover:bg-white/10"
                            disabled={tool.comingSoon}
                          >
                            {tool.comingSoon ? 'Coming Soon' : 'Try Now'}
                            {!tool.comingSoon && <ArrowRight className="w-4 h-4" />}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* All Tools */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6">All Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="glass-panel border-white/10 hover:bg-white/5 transition-all duration-300 group cursor-pointer h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          {tool.comingSoon && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                              Soon
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription className="text-white/60 text-sm line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span>{tool.rating}</span>
                          </div>
                          <span>{tool.uses}</span>
                        </div>
                        {tool.href && !tool.comingSoon ? (
                          <Link href={tool.href}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="w-full text-white/80 hover:text-white hover:bg-white/10"
                            >
                              Try Now
                            </Button>
                          </Link>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="w-full text-white/80 hover:text-white hover:bg-white/10"
                            disabled={tool.comingSoon}
                          >
                            {tool.comingSoon ? 'Coming Soon' : 'Try Now'}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}