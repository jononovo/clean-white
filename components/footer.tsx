
import { Github, Twitter, MessageSquare, Shield } from "lucide-react";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo_v2.png" alt="SecureClawHub" className="w-10 h-10 object-contain" />
              <span className="font-display font-bold text-lg">SecureClawHub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The OpenClaw Hub for community, jobs, news and secure, enterprise-ready OpenClaw Bots.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="sr-only">Discord</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Browse Skills</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Verified Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SDKs & Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security Scanners</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
              <li>
                <a href="https://clawhub.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium flex items-center gap-2">
                  The Daily Claw <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">NEW</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {CURRENT_YEAR} OpenClaw Security. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/80 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Secured by OpenClaw Identity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
