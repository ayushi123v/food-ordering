import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText,
  ChevronRight 
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpSupport = () => {
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse through our menu, add items to your cart, and proceed to checkout. You can track your order in real-time from the My Orders section.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, wallet payments, and cash on delivery. You can manage your payment methods in the Wallet section.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Go to My Orders section and click on your active order to see real-time tracking information and estimated delivery time.',
    },
    {
      question: 'What is your refund policy?',
      answer: 'If you\'re not satisfied with your order, you can request a refund within 24 hours. Our team will review and process your request within 3-5 business days.',
    },
    {
      question: 'How do I update my delivery address?',
      answer: 'Go to Manage Addresses section from the sidebar. You can add, edit, or delete addresses as needed.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order before it is prepared. Go to My Orders and select the order you want to cancel. Please note that cancellation may not be possible once preparation has started.',
    },
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      action: 'Start Chat',
    },
    {
      title: 'Call Us',
      description: '+1 (800) 123-4567',
      icon: Phone,
      action: 'Call Now',
    },
    {
      title: 'Email Support',
      description: 'support@foodhub.com',
      icon: Mail,
      action: 'Send Email',
    },
    {
      title: 'Help Center',
      description: 'Browse our help articles',
      icon: FileText,
      action: 'Visit',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">We're here to help you</p>
      </div>

      {/* Contact Support */}
      <div className="grid gap-4 md:grid-cols-2">
        {supportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card key={option.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Still Need Help */}
      <Card className="bg-gradient-to-r from-primary to-secondary text-white">
        <CardContent className="py-8 text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-bold mb-2 text-white">Still Need Help?</h3>
          <p className="text-white/90 mb-6">
            Our support team is available 24/7 to assist you
          </p>
          <Button variant="secondary" size="lg">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
