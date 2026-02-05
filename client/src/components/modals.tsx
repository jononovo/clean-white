
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Full Page Modal ---

interface FullPageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FullPageModal({ 
  open, 
  onOpenChange, 
  title, 
  children, 
  className 
}: FullPageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "max-w-[95vw] w-full h-[95vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl duration-300 [&>button:last-child]:hidden",
          className
        )}
      >
        {/* Custom Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
           <div className="text-2xl font-display font-bold text-foreground">
             {title}
           </div>
           <Button 
             variant="ghost" 
             size="icon" 
             className="rounded-full h-10 w-10 hover:bg-muted/50"
             onClick={() => onOpenChange(false)}
           >
             <X className="w-5 h-5 text-muted-foreground" />
           </Button>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}


// --- Confirmation Modal ---

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
}

export function ConfirmationModal({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  confirmLabel = "Continue", 
  cancelLabel = "Cancel",
  variant = "default", 
  onConfirm 
}: ConfirmationModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[400px] gap-6 border-border/50 shadow-xl bg-card">
        <AlertDialogHeader className="gap-2">
           <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-full flex items-center justify-center shrink-0", 
                variant === 'destructive' ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
              )}>
                 {variant === 'destructive' ? <AlertCircle className="w-5 h-5" /> : <Check className="w-5 h-5" />}
              </div>
              <AlertDialogTitle className="text-xl font-display">{title}</AlertDialogTitle>
           </div>
           <AlertDialogDescription className="text-muted-foreground text-sm leading-relaxed pl-[3.25rem]">
             {description}
           </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-3">
          <AlertDialogCancel onClick={() => onOpenChange(false)} className="h-10 px-5 text-sm">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={cn(
              "h-10 px-5 text-sm font-semibold shadow-md",
              variant === 'destructive' 
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
