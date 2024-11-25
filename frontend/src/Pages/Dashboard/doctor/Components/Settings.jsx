import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePatient } from "@/contexts/PatientContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Bell, Moon, Sun, Globe, Lock, Shield, Smartphone } from "lucide-react";

const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");

  const { user } = useAuth();
  const patient = usePatient();

  const handleSave = () => {
    console.log("Settings Saved:", { darkMode, language, email });
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Customize your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="general">
                  <AccordionTrigger>
                    <Globe size={16} /> General
                  </AccordionTrigger>
                  <AccordionContent>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <Label>Email</Label>
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                      <Label>Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="appearance">
                  <AccordionTrigger>
                    <Moon size={16} /> Appearance
                  </AccordionTrigger>
                  <AccordionContent>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Label>Dark Mode</Label>
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="security">
                  <AccordionTrigger>
                    <Shield size={16} /> Security
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <Label>Password</Label>
                      <Input type="password" placeholder="Enter your password" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default SettingsModal;
