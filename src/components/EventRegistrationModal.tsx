import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building, BookOpen, Phone, Mail, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NeonButton from './NeonButton';
import { toast } from 'sonner';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

const EventRegistrationModal = ({ isOpen, onClose, eventName }: EventRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    courseYear: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.college || !formData.courseYear || !formData.phone || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`Successfully registered for ${eventName}!`);
    setFormData({ name: '', college: '', courseYear: '', phone: '', email: '' });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-card border border-primary/30 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
              
              {/* Header */}
              <div className="relative p-6 border-b border-border">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-display text-primary neon-text-subtle">REGISTER</h2>
                <p className="text-sm text-muted-foreground mt-1 font-stranger tracking-wider">
                  {eventName}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="relative p-6 space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                {/* College */}
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-sm text-muted-foreground flex items-center gap-2">
                    <Building className="w-4 h-4 text-primary" />
                    College
                  </Label>
                  <Input
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college name"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                {/* Course/Year */}
                <div className="space-y-2">
                  <Label htmlFor="courseYear" className="text-sm text-muted-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Course/Year
                  </Label>
                  <Input
                    id="courseYear"
                    name="courseYear"
                    value={formData.courseYear}
                    onChange={handleChange}
                    placeholder="e.g., B.Tech CSE - 3rd Year"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>

                {/* Event Name (readonly) */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Event
                  </Label>
                  <Input
                    value={eventName}
                    disabled
                    className="bg-primary/10 border-primary/30 text-primary"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <NeonButton 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Submit Registration'}
                  </NeonButton>
                </div>
              </form>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventRegistrationModal;
