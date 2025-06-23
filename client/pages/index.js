import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Sparkles, Check, Crown, Zap } from "lucide-react";
import { useState, useEffect } from "react";

//HygieiaChat Features
const features = [
  {
    title: "24/7 Availability",
    description:
      "HygieiaChat is always online, so you can access its services whenever you need to.",
    icon: (
      <svg
        className="w-6 h-6 text-mint-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Simple Chatbot Interface",
    description:
      "Our chatbot is easy-to-use, making it simple to ask a variety of health-related questions.",
    icon: (
      <svg
        className="w-6 h-6 text-mint-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    title: "AI-Powered Learning",
    description:
      "Trained on GPT-4 technology, our chatbot searches for verified health research papers to provide you with accurate answers.",
    icon: (
      <svg
        className="w-6 h-6 text-mint-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const savedSubscription = localStorage.getItem("subscription");
    setSubscription(savedSubscription);


    if (savedSubscription) {
      console.log("Subscription found:", savedSubscription);
    } else {
      console.log("No subscription found.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-gray-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Health Advice Made Instantaneous
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                Access HygieiaChat today for quick, reliable health advice for
                your needs.
              </p>
              <Link
                href="/chat"
                className="inline-block hover:shadow-lg border-2 bg-mint-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-mint-800 transition-colors"
              >
                Try HygieiaChat Now
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-r from-mint-300 to-mint-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why Choose HygieiaChat?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow bg-white border-gray-200"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-24 ">
          <div className="absolute -right-40 top-20 -z-10 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]"></div>
          <div className="absolute -left-40 bottom-20 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]"></div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                Choose Your Plan
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Select the perfect plan for your transcription needs. Upgrade
                anytime as your requirements grow.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {/* Free Tier */}
              <Card className="glass-effect border-2 transition-all duration-300 hover:shadow-lg flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Sparkles className="mr-2 h-5 w-5 text-secondary" />
                    Free
                  </CardTitle>
                  <CardDescription>For casual users</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {["Access to basic services", "Limited Messages per Day", "Obtain Conversation Receipts via Email"].map(
                      (feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10">
                            <Check className="h-3 w-3 text-secondary" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full hover:bg-secondary/5"
                  >
                    <Link href="/login?mode=signup">Sign Up</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card className="glass-effect relative border-2 border-mint-700/30 shadow-lg shadow-mint-700/10 transition-all duration-300 hover:border-mint-700/50 hover:shadow-xl flex flex-col">
                <div className="absolute -right-3 -top-3 rounded-full border border-mint-700/20 bg-gradient-to-r from-mint-700 to-mint-800 px-3 py-1 text-xs font-medium text-white shadow-sm">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Crown className="mr-2 h-5 w-5 text-mint-700" />
                    Pro
                  </CardTitle>
                  <CardDescription>For based sigmas</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">$5,000.99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {[
                      "Acess to All Free Features",
                      "Unlimited Messages",
                      "Early Access to Tools",
                      "Priority Support",
                      "Access to Image/Vision Processing Services",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-mint-700/15 border border-mint-700/30">
                          <Zap className="h-3 w-3 text-mint-700" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {subscription === "Pro" ? (
                    <div className="w-full rounded-full bg-gray-200 text-gray-700 text-center py-3 font-semibold">
                      You have this subscription saved
                    </div>
                  ) : (
                    <Button
                      asChild
                      className="w-full rounded-full bg-mint-700 text-white hover:bg-mint-800"
                    >
                      <Link href="/payment?plan=Pro">Subscribe Now</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Commenting out the subscription page for now; if needed, we can modify the subscription page to be used for something else (payment page, comparison, etc) */}
        {/* <SubscriptionPage /> */}

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-mint-200 to-mint-300">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Receive Reliable Health Advice?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Create an account today to make the most out of HygieiaChat's
              convenient services.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/login?mode=signup"
                className="hover:shadow-lg border-2 bg-mint-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-mint-800 transition-colors"
              >
                Sign Up Today
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="flex flex-row justify-between items-start">
              {/* Company Name and Description*/}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  HygieiaChat
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  Providing reliable health advice through advanced AI
                  technology.
                </p>
              </div>

              {/*Copyright */}
              <div className="flex items-center">
                <p className="text-sm text-gray-500">
                  © 2025 HygieiaChat. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
