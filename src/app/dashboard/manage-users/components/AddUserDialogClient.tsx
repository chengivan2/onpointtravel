"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export default function AddUserDialogClient() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", role: "user", password: "" });
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  // Listen for global event to open dialog
  if (typeof window !== "undefined") {
    window.addEventListener("openAddUserDialog", () => setOpen(true));
  }

  const handleChange = (e: any) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim() || !form.password) {
      toast.error("All fields are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    const { error, data } = await supabase.auth.admin.createUser({
      email: form.email,
      password: form.password,
      user_metadata: {
        first_name: form.first_name,
        last_name: form.last_name,
        role: form.role,
      },
    });
    setLoading(false);
    if (error || !data?.user) {
      toast.error(error?.message || "Failed to create user");
      return;
    }
    toast.success("User created");
    setOpen(false);
    setForm({ first_name: "", last_name: "", email: "", role: "user", password: "" });
  };

  return (
    <>
      <Button
        variant="default"
        className="w-full flex items-center gap-2 justify-start bg-green-600 hover:bg-green-700 text-white shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Add user"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add User</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-full h-auto max-h-[90vh] overflow-y-auto p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/60 dark:bg-green-900/20 border border-green-100/30 dark:border-green-900/30">
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-100">Add User</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
              First Name
              <Input
                name="first_name"
                aria-label="First Name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
              Last Name
              <Input
                name="last_name"
                aria-label="Last Name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
              Email
              <Input
                name="email"
                aria-label="Email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
              Role
              <select
                name="role"
                aria-label="Role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="user" className="text-green-700 dark:text-green-300 bg-white dark:bg-green-900/50">User</option>
                <option value="agent" className="text-green-700 dark:text-green-300 bg-white dark:bg-green-900/50">Agent</option>
                <option value="admin" className="text-green-700 dark:text-green-300 bg-white dark:bg-green-900/50">Admin</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
              Password
              <Input
                name="password"
                aria-label="Password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </label>
            <DialogFooter className="flex flex-col md:flex-row gap-2 mt-4">
              <Button
                type="submit"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-md"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full md:w-auto border-green-400 text-green-700 dark:text-green-200 bg-white/60 dark:bg-green-900/20 hover:bg-green-50 dark:hover:bg-green-900/40"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
