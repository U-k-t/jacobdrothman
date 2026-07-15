import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-[calc(100vh-theme(spacing.16))]">
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Get in Touch</h1>

          <p className="text-lg text-muted-foreground mb-12">
            I'm always interested in hearing about new opportunities, collaboration, or just having a conversation about product management. Feel free to reach out!
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2ff]/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2ff]/30"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2ff]/30"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2ff]/30 resize-none"
                    placeholder="Tell me more..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#1fa2ff] to-[#60b8ff] text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-[#1fa2ff]/25 transition-all"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="mb-4">Connect With Me</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:mrjrothman@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-[#1fa2ff]" />
                    </div>
                    <span>mrjrothman@gmail.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/jacob-rothman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Linkedin size={20} className="text-[#1fa2ff]" />
                    </div>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/U-k-t"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-[#1fa2ff] transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1fa2ff]/20 to-[#60b8ff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Github size={20} className="text-[#1fa2ff]" />
                    </div>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              <div className="bg-accent/50 border border-border rounded-lg p-6">
                <h3 className="mb-3">Response Time</h3>
                <p className="text-muted-foreground">
                  I typically respond to messages within 24-48 hours. Looking forward to hearing from you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
