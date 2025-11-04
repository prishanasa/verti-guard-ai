-- Add missing UPDATE policy for emergency_contacts table
CREATE POLICY "Users can update their own contacts" 
ON emergency_contacts 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add explicit immutability policies for events table
CREATE POLICY "Events cannot be updated" 
ON events 
FOR UPDATE 
USING (false);

CREATE POLICY "Events cannot be deleted" 
ON events 
FOR DELETE 
USING (false);