import { Wrench, Database, Users, GraduationCap, Handshake, Receipt, LucideIcon } from "lucide-react";

export interface ServiceCategory {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "setup_installation", label: "Setup & Install", icon: Wrench },
  { id: "managed_hosting", label: "Managed Hosting", icon: Database },
  { id: "consulting", label: "Consulting", icon: Users },
  { id: "training", label: "Training", icon: GraduationCap },
  { id: "partnerships", label: "Partnerships", icon: Handshake },
  { id: "finance_tax", label: "Finance & Tax", icon: Receipt },
];
