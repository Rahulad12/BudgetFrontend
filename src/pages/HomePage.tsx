import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, PieChart, Target, TrendingUp, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

// Import sample images
import DashboardPreview from "/images/dashboard-preview.png";
import MobileAppPreview from "/images/mobile-preview.jpg";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Track Transactions",
      description: "Add income and expenses with category & date",
      icon: <TrendingUp className="text-indigo-600" size={24} />
    },
    {
      title: "Real-time Balance",
      description: "View your current financial status instantly",
      icon: <BarChart2 className="text-indigo-600" size={24} />
    },
    {
      title: "Visual Analytics",
      description: "Insightful charts to understand spending patterns",
      icon: <PieChart className="text-indigo-600" size={24} />
    },
    {
      title: "Goal Tracking",
      description: "Set and monitor monthly budget targets",
      icon: <Target className="text-indigo-600" size={24} />
    },
    {
      title: "Mobile Friendly",
      description: "Access your budget anywhere, anytime",
      icon: <Smartphone className="text-indigo-600" size={24} />
    },
  ];

  const steps = [
    "Create your free account in seconds",
    "Add your income sources and expenses",
    "Categorize transactions for better insights",
    "Set monthly budget goals",
    "See history of your transactions and insights",
    "Track your monthly budget and saving goals",
  ];

  return (
    <div className="font-sans bg-gray-50 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 to-purple-600 text-white py-28 px-6 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Take Control of Your <span className="text-indigo-200">Finances</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Mero Budget helps you track spending, save money, and reach your financial goals with ease.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/register">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* App Preview Section - Two Column Layout */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Images Column */}
          <div className="relative">
            <motion.div
              className="rounded-xl overflow-hidden shadow-xl border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={DashboardPreview}
                alt="Mero Budget Dashboard Preview"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-8 -right-8 w-1/3 rounded-xl overflow-hidden shadow-xl border-2 border-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img
                src={MobileAppPreview}
                alt="Mero Budget Mobile Preview"
                className="w-full h-64"
              />
            </motion.div>
          </div>

          {/* Content Column */}
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Beautiful Interface, Powerful Features
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Mero Budget offers a clean, intuitive interface that works seamlessly across all your devices. Track your finances wherever you are with our mobile-friendly design.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/register">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-6 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Powerful Features for <span className="text-indigo-600">Better Budgeting</span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Everything you need to manage your money effectively in one beautiful dashboard
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-indigo-50 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple Steps to Financial Control</h2>
            <p className="text-lg text-gray-600">Get started in minutes and see results immediately</p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                  <span className="text-indigo-700 font-bold">{idx + 1}</span>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Finances?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of users who are taking control of their money with Mero Budget
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/register">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-8 py-6 text-lg">
                Start Your Free Trial
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">Mero Budget</h3>
              <p className="text-gray-400">Your personal finance companion</p>
              <a href="mailto:adrahul2014@gmail.com" className="hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Mero Budget. All rights reserved.</p>
            <p className="mt-2">Developed By <a href="https://www.adhikarirahul.com.np" target="_blank" className="hover:text-white">Rahul Adhikari</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;