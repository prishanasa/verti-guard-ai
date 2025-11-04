import { useState } from "react";
import Layout from "@/components/Layout";
import AddContactForm from "@/components/contacts/AddContactForm";
import ContactList from "@/components/contacts/ContactList";

const Contacts = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Emergency Contacts</h1>
          <p className="text-muted-foreground">
            Manage your emergency contact list for quick notifications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AddContactForm onContactAdded={handleContactAdded} />
          <ContactList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
