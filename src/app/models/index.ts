export type Project = {
  id: number;
  name: string;
  description: string;
};

export type EncryptedUser = {
  id: number;
  name: string;
  surname: string;
  role: string;
};

export type Story = {
  id: number;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "to do" | "in progress" | "done";
  creationDate: Date;
};
