import { PaperProps } from "@mantine/core";
import { DropzoneProps } from "@mantine/dropzone";
import { ReactNode } from "react";

export interface Expense {
  amount: string,
  name: string,
  status: string,
  id: number,
}

export interface User {
  name: string;
  email: string;
  role: string;
  accessToken: string;
  status: string;
  id: number
};


export interface TableComponentProps {
  expenses: Expense[] | [],
  handleStatusChange?: (arg: number, type: 'approved' | 'rejected') => void;
}

export interface ExpenseProps {
  expenses: Expense[];
  consultant: User;
}

export interface ApiEndpoints {
  signup: string;
  login: string;
  createExpense: string;
  getExpenses: string;
  getUserExpenses: string;
  getUser: string;
  updateStatus: (userId: number) => string;
  uploadImage: string;
}

export interface ProfileProps {
  name: string,
  email: string,
  image?: string,
}

export interface SignupPayload {
  email: string,
  name: string,
  password: string,
  role: string
}

export interface IConfig {
  method: 'GET' | 'POST' | 'PATCH',
  body?: string,
  headers: {
    [key: string]: string
  }
};

export interface ImageUploadProps extends DropzoneProps {
  getImageName: (arg: string) => void;
}

export interface ExpenseFormProps extends PaperProps {
  close: () => void
}

export type LayoutProps = {
  children?: ReactNode
  title?: string
}
