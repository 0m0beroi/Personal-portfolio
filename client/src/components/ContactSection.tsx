import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type InsertMessage } from "@shared/schema";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertMessage) => {
      const response = await apiRequest("POST", "/api/messages", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/messages"] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send a message.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: "fas fa-envelope",
      label: "Email",
      value: "your-actual-email@gmail.com",
      href: "mailto:your-actual-email@gmail.com",
    },
    {
      icon: "fas fa-phone",
      label: "Phone",
      value: "+91 your-phone-number",
      href: "tel:+91your-phone-number",
    },
    {
      icon: "fas fa-map-marker-alt",
      label: "Location",
      value: "Your City, Your State, India",
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: "fab fa-linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/omoberoi",
      color: "text-blue-600",
    },
    {
      icon: "fab fa-github",
      label: "GitHub",
      href: "https://github.com/0m0beroi",
      color: "text-foreground",
    },
    {
      icon: "fas fa-code",
      label: "LeetCode",
      href: "https://leetcode.com/u/0m0beroi",
      color: "text-orange-500",
    },
    {
      icon: "fab fa-instagram",
      label: "Instagram",
      href: "https://www.instagram.com/0m0beroi",
      color: "text-pink-500",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="contact-description">
            Ready to collaborate on innovative projects? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glassmorphism rounded-xl p-8" data-testid="contact-form-container">
            <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  data-testid="input-name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  data-testid="input-email"
                />
              </div>

              <div>
                <Label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell me about your project or inquiry..."
                  required
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:glow-effect transition-all duration-300 transform hover:scale-105"
                data-testid="button-send-message"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
                <i className="fas fa-paper-plane ml-2"></i>
              </Button>
            </form>
          </div>

          {/* Contact Information & Social Links */}
          <div className="space-y-6">
            <div className="glassmorphism rounded-xl p-8" data-testid="contact-info-container">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4" data-testid={`contact-info-${index}`}>
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <i className={`${info.icon} text-primary`}></i>
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary hover:underline"
                          data-testid={`contact-link-${index}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="glassmorphism rounded-xl p-8" data-testid="social-links-container">
              <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 glassmorphism rounded-lg hover:glow-effect transition-all duration-300"
                    data-testid={`social-link-${social.label.toLowerCase()}`}
                  >
                    <i className={`${social.icon} ${social.color} text-xl`}></i>
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
