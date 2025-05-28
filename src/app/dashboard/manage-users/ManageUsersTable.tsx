"use client";
import { useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ManageUsersTable({ initialUsers, role }: { initialUsers: any[]; role: string }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "created_at", dir: "desc" });
  const [filterDate, setFilterDate] = useState("");
  const [filterAlpha, setFilterAlpha] = useState("");
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const supabase = createClient();

  // Filtering, searching, sorting
  const filteredUsers = useMemo(() => {
    let data = [...users];
    if (search) {
      data = data.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterDate) {
      data = data.filter((u) => u.created_at?.startsWith(filterDate));
    }
    if (filterAlpha) {
      data = data.filter((u) => u.name?.toLowerCase().startsWith(filterAlpha.toLowerCase()));
    }
    if (sort.key === "created_at") {
      data.sort((a, b) =>
        sort.dir === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sort.key === "name") {
      data.sort((a, b) =>
        sort.dir === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    return data;
  }, [users, search, sort, filterDate, filterAlpha]);

  // Edit dialog handlers
  const openEditDialog = (user: any) => {
    setEditingUser(user);
    setEditForm({ ...user });
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };
  const handleEditChange = (e: any) => {
    setEditForm((f: any) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleEditSave = async () => {
    // Only update editable fields
    const { id, first_name, last_name, email, role: userRole } = editForm;
    const { error } = await supabase.from("users").update({
      first_name: first_name || "",
      last_name: last_name || "",
      email,
      role: userRole,
    }).eq("id", id);
    if (error) {
      toast.error("Failed to update user");
    } else {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, first_name, last_name, name: `${first_name} ${last_name}`.trim(), email, role: userRole } : u)));
      toast.success("User updated");
      closeDialog();
    }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete user");
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted");
      closeDialog();
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <Input placeholder="Search name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="max-w-xs" />
        <Input placeholder="Filter by first letter..." value={filterAlpha} onChange={(e) => setFilterAlpha(e.target.value)} className="max-w-xs" />
        <Button variant="outline" onClick={() => setSort({ key: "created_at", dir: sort.dir === "asc" ? "desc" : "asc" })}>
          Sort by Created {sort.dir === "asc" ? "↑" : "↓"}
        </Button>
        <Button variant="outline" onClick={() => setSort({ key: "name", dir: sort.dir === "asc" ? "desc" : "asc" })}>
          Sort by Name {sort.dir === "asc" ? "↑" : "↓"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.created_at ? format(new Date(user.created_at), "yyyy-MM-dd") : ""}</TableCell>
              <TableCell>
                <Button size="sm" onClick={() => openEditDialog(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-2xl w-full h-[90vh] max-h-[90vh] overflow-y-auto p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/60 dark:bg-green-900/20 border border-green-100/30 dark:border-green-900/30"
        >
          <DialogHeader>
            <DialogTitle className="text-green-800 dark:text-green-100">Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <form className="flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
                First Name
                <Input
                  name="first_name"
                  aria-label="First Name"
                  value={editForm.first_name || ""}
                  onChange={handleEditChange}
                  placeholder="First Name"
                  className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
                Last Name
                <Input
                  name="last_name"
                  aria-label="Last Name"
                  value={editForm.last_name || ""}
                  onChange={handleEditChange}
                  placeholder="Last Name"
                  className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
                Email
                <Input
                  name="email"
                  aria-label="Email"
                  value={editForm.email || ""}
                  onChange={handleEditChange}
                  placeholder="Email"
                  className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
                Role
                {role === "admin" ? (
                  <select
                    name="role"
                    aria-label="Role"
                    value={editForm.role || ""}
                    onChange={handleEditChange}
                    className="bg-white/70 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 focus:ring-green-500 focus:border-green-500 rounded-md p-2"
                  >
                    <option value="admin">admin</option>
                    <option value="agent">agent</option>
                    <option value="user">user</option>
                  </select>
                ) : (
                  <Input
                    name="role"
                    aria-label="Role"
                    value={editForm.role || ""}
                    disabled
                    className="bg-white/40 dark:bg-green-900/10 border-green-100 dark:border-green-900 text-green-700 dark:text-green-300"
                  />
                )}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-green-900 dark:text-green-200">
                Created At
                <Input
                  name="created_at"
                  aria-label="Created At"
                  value={editForm.created_at || ""}
                  disabled
                  className="bg-white/40 dark:bg-green-900/10 border-green-100 dark:border-green-900 text-green-700 dark:text-green-300"
                />
              </label>
              <DialogFooter className="flex flex-col md:flex-row gap-2 mt-4">
                <Button
                  type="button"
                  onClick={async () => {
                    const { id, first_name, last_name, email, role: userRole } = editForm;
                    const { error } = await supabase.from("users").update({
                      first_name: first_name || "",
                      last_name: last_name || "",
                      email,
                      role: userRole,
                    }).eq("id", id);
                    if (error) {
                      toast.error("Failed to update user");
                    } else {
                      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, first_name, last_name, name: `${first_name} ${last_name}`.trim(), email, role: userRole } : u)));
                      toast.success("User updated");
                      closeDialog();
                    }
                  }}
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-md"
                >
                  Save
                </Button>
                {role === "admin" && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDelete(editingUser.id)}
                    className="w-full md:w-auto border-red-600 bg-red-600 hover:bg-red-700 text-white shadow-md"
                  >
                    Delete
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  className="w-full md:w-auto border-green-400 text-green-700 dark:text-green-200 bg-white/60 dark:bg-green-900/20 hover:bg-green-50 dark:hover:bg-green-900/40"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
