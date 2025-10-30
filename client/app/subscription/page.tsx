'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react'

import ProtectedRoute from '@/components/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for individuals getting started with AI',
    icon: Star,
    color: 'from-blue-400 to-blue-600',
    popular: false,
    features: [
      '10,000 AI credits per month',
      'Access to basic AI tools',
      'Email support',
      'Basic analytics',
      '5 projects',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Ideal for professionals and small teams',
    icon: Zap,
    color: 'from-purple-400 to-purple-600',
    popular: true,
    features: [
      '50,000 AI credits per month',
      'Access to all AI tools',
      'Priority support',
      'Advanced analytics',
      'Unlimited projects',
      'API access',
      'Custom integrations',
    ],
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'Built for growing businesses and teams',
    icon: Crown,
    color: 'from-orange-400 to-orange-600',
    popular: false,
    features: [
      '200,000 AI credits per month',
      'All Pro features',
      'Dedicated support',
      'Team management',
      'Advanced security',
      'Custom models',
      'SLA guarantee',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations',
    icon: Rocket,
    color: 'from-green-400 to-green-600',
    popular: false,
    features: [
      'Unlimited AI credits',
      'All Business features',
      '24/7 phone support',
      'Custom deployment',
      'Advanced compliance',
      'Dedicated account manager',
      'Custom pricing',
    ],
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

export default function SubscriptionPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                AI Plan
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto">
              Unlock the full potential of artificial intelligence with our flexible pricing plans. 
              Choose the perfect plan for your needs and scale as you grow.
            </p>
          </motion.div>

          {/* Current Plan */}
          <motion.div variants={itemVariants}>
            <Card className="glass-panel border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Current Plan</CardTitle>
                <CardDescription className="text-white/60">
                  Your active subscription details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Starter Plan</h3>
                      <p className="text-white/60">8,450 credits remaining this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">$9/month</p>
                    <p className="text-sm text-white/60">Renews on Jan 15, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pricing Plans */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => {
                const Icon = plan.icon
                return (
                  <motion.div
                    key={plan.name}
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <Card className={`glass-panel border-white/10 h-full ${
                      plan.popular ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' : ''
                    } hover:bg-white/5 transition-all duration-300 group`}>
                      <CardHeader className="text-center pb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                        <CardDescription className="text-white/60">
                          {plan.description}
                        </CardDescription>
                        <div className="pt-4">
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                          <span className="text-white/60">{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                              <span className="text-white/80">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                              : 'bg-white/10 hover:bg-white/20 border border-white/20'
                          } text-white`}
                        >
                          {plan.name === 'Enterprise' ? 'Contact Sales' : 'Choose Plan'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-panel border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">What are AI credits?</h3>
                  <p className="text-white/60">
                    AI credits are used to access our AI tools and services. Different tools consume different amounts of credits based on complexity and processing time.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Can I change my plan anytime?</h3>
                  <p className="text-white/60">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Do unused credits roll over?</h3>
                  <p className="text-white/60">
                    Pro and higher plans include credit rollover for up to 3 months. Starter plan credits reset monthly.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Is there a free trial?</h3>
                  <p className="text-white/60">
                    Yes! New users get 1,000 free credits to explore our platform. No credit card required to start.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
}