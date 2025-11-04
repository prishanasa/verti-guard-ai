import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  contact_name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  contact_phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[+]?[0-9\s()-]+$/, "Invalid phone number format"),
  contact_email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .optional()
    .or(z.literal(""))
});

interface AddContactFormProps {
  onContactAdded: () => void;
}

const AddContactForm = ({ onContactAdded }: AddContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input data
      const validationResult = contactSchema.safeParse({
        contact_name: name,
        contact_phone: phone,
        contact_email: email,
      });

      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(firstError.message);
        setIsSubmitting(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const validated = validationResult.data;
      const { error } = await supabase.from("emergency_contacts").insert({
        user_id: user.id,
        contact_name: validated.contact_name,
        contact_phone: validated.contact_phone,
        contact_email: validated.contact_email || null,
      });

      if (error) throw error;

      toast.success("Emergency contact added successfully");
      setName("");
      setPhone("");
      setEmail("");
      onContactAdded();
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add emergency contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <UserPlus className="h-5 w-5" />
        Add Emergency Contact
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Adding..." : "Add Contact"}
        </Button>
      </form>
    </Card>
  );
};

export default AddContactForm;
