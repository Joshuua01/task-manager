import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function TopNavbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-secondary p-5 text-primary">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-3xl font-bold">
          Task Manager
        </Link>
        {/* Select shows up only on logged in users */}
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Project #1</SelectItem>
            <SelectItem value="2">Project #2</SelectItem>
            <SelectItem value="3">Project #3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-5">
        <Button variant="outline">Sign in</Button>
        <Button variant="default">Sign up</Button>
      </div>
    </nav>
  );
}
