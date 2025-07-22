import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Shield, CreditCard, Palette, Globe, Mail, Phone, Building2, MapPin, Save, Camera, Check, X } from "lucide-react";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "preferences", label: "Preferences", icon: Palette },
];

export const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "John Contractor",
    email: "john.contractor@example.com",
    phone: "+91 98765 43210",
    company: "ABC Construction Pvt. Ltd.",
    designation: "CEO",
    location: "Mumbai, Maharashtra",
    bio: "Experienced contractor specializing in infrastructure and construction projects.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    tenderMatches: true,
    deadlineReminders: true,
    contractUpdates: true,
    marketingEmails: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-chart-1 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  JC
                </div>
                <Button 
                  size="icon" 
                  variant="default"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{profileData.name}</h3>
                <p className="text-muted-foreground">{profileData.designation} at {profileData.company}</p>
                <Badge className="mt-2 bg-chart-2/10 text-chart-2 border-chart-2/20">Premium Member</Badge>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Company</label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Designation</label>
                <input
                  type="text"
                  value={profileData.designation}
                  onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Email Notifications */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                      <div className="absolute left-[2px] top-[2px] bg-background w-5 h-5 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* SMS Notifications */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                      <div className="absolute left-[2px] top-[2px] bg-background w-5 h-5 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Types */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base">Notification Types</CardTitle>
                  <CardDescription>Choose what you want to be notified about</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Tender Matches</h4>
                      <p className="text-sm text-muted-foreground">New tenders matching your criteria</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.tenderMatches}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, tenderMatches: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                      <div className="absolute left-[2px] top-[2px] bg-background w-5 h-5 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Deadline Reminders</h4>
                      <p className="text-sm text-muted-foreground">Upcoming tender and contract deadlines</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.deadlineReminders}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, deadlineReminders: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                      <div className="absolute left-[2px] top-[2px] bg-background w-5 h-5 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Contract Updates</h4>
                      <p className="text-sm text-muted-foreground">Status changes and milestones</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.contractUpdates}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, contractUpdates: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                      <div className="absolute left-[2px] top-[2px] bg-background w-5 h-5 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Marketing Emails</h4>
                      <p className="text-sm text-muted-foreground">Tips, updates, and promotional content</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.marketingEmails}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>
                      <div className="absolute left-[2px] top-[2px] bg-background w-5 h-5 rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  />
                </div>
                <Button variant="gradient">
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className="mt-1 border-destructive text-destructive">
                      <X className="w-3 h-3 mr-1" />
                      Disabled
                    </Badge>
                  </div>
                  <Button variant="outline" className="border-border hover:bg-accent">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active sessions across devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Current Session</h4>
                    <p className="text-sm text-muted-foreground">Chrome on Windows • Mumbai, India</p>
                    <p className="text-xs text-muted-foreground mt-1">Active now</p>
                  </div>
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                    <Check className="w-3 h-3 mr-1" />
                    Current
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Mobile App</h4>
                    <p className="text-sm text-muted-foreground">TenderFlow iOS • Pune, India</p>
                    <p className="text-xs text-muted-foreground mt-1">Last active 2 days ago</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-border hover:bg-accent">
                    Revoke
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <Card className="border-border bg-gradient-to-br from-primary/10 to-chart-1/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent mt-1">
                      Premium
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">₹9,999/month</p>
                  </div>
                  <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                    Active
                  </Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-chart-2" />
                    Unlimited tender alerts
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-chart-2" />
                    Advanced matching algorithm
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-chart-2" />
                    Priority support
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" className="border-border hover:bg-accent">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="border-border hover:bg-accent">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-border hover:bg-accent">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div>
                      <p className="font-medium text-foreground">February 2024</p>
                      <p className="text-sm text-muted-foreground">Premium Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">₹9,999</p>
                      <p className="text-sm text-chart-2">Paid</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                    <div>
                      <p className="font-medium text-foreground">January 2024</p>
                      <p className="text-sm text-muted-foreground">Premium Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">₹9,999</p>
                      <p className="text-sm text-chart-2">Paid</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Tender Preferences</CardTitle>
                <CardDescription>Customize your tender matching preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Preferred Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {["Infrastructure", "Technology", "Healthcare", "Energy", "Education"].map((cat) => (
                      <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Preferred Locations</label>
                  <div className="flex flex-wrap gap-2">
                    {["Mumbai", "Pune", "Nashik", "All Maharashtra", "Pan India"].map((loc) => (
                      <Badge key={loc} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        {loc}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Budget Range</label>
                  <select className="w-full px-4 py-2.5 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
                    <option>₹1 Cr - ₹10 Cr</option>
                    <option>₹10 Cr - ₹50 Cr</option>
                    <option>₹50 Cr - ₹100 Cr</option>
                    <option>Above ₹100 Cr</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Theme</h4>
                    <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                  </div>
                  <select className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Language</h4>
                    <p className="text-sm text-muted-foreground">Select your preferred language</p>
                  </div>
                  <select className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200">
                    <option>English</option>
                    <option>हिन्दी</option>
                    <option>मराठी</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Settings Navigation */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {settingsSections.map((section) => (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                variant={activeSection === section.id ? "gradient" : "secondary"}
                size="default"
                className="justify-start"
              >
                <section.icon className="w-4 h-4 mr-2" />
                {section.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Content */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {settingsSections.find(s => s.id === activeSection)?.icon && (
              <>{React.createElement(settingsSections.find(s => s.id === activeSection)!.icon, { className: "w-5 h-5 text-primary" })}</>
            )}
            {settingsSections.find(s => s.id === activeSection)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          variant="gradient"
          className="min-w-[120px]"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};