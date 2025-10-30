'use client'

import { motion } from 'framer-motion'
import { User, Mail, Calendar, Shield, LogOut, Edit } from 'lucide-react'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AccountPage() {
  const { user, logout } = useAuth()

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@')
    const maskedName = name.substring(0, 2) + '*'.repeat(name.length - 2)
    return `${maskedName}@${domain}`
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <h1 className="text-3xl font-bold text-white mb-4">Account Settings</h1>
            <p className="text-white/60">Manage your account information and preferences</p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-white/60">
                  Your personal account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
                    <p className="text-white/60">{user?.email}</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Full Name</label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-white">{user?.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email Address</label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center">
                      <Mail className="w-4 h-4 text-white/60 mr-2" />
                      <span className="text-white">{user?.email && maskEmail(user.email)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Member Since</label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center">
                      <Calendar className="w-4 h-4 text-white/60 mr-2" />
                      <span className="text-white">
                        {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Account Status</label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center">
                      <Shield className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-panel border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-white/60">
                  Manage your account security and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Password</h4>
                    <p className="text-white/60 text-sm">Change your account password</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-white/60 text-sm">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Enable 2FA
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Login Sessions</h4>
                    <p className="text-white/60 text-sm">Manage your active sessions</p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-panel border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400">Danger Zone</CardTitle>
                <CardDescription className="text-white/60">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div>
                    <h4 className="text-red-400 font-medium">Sign Out</h4>
                    <p className="text-white/60 text-sm">Sign out from your account</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div>
                    <h4 className="text-red-400 font-medium">Delete Account</h4>
                    <p className="text-white/60 text-sm">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
}