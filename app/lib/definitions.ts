// This file contains type definitions for your data.
// 此文件包含您数据的类型定义。
// It describes the shape of the data, and what data type each property should accept.
// 它描述了数据的形状，以及每个属性应该接受的数据类型。
// For simplicity of teaching, we're manually defining these types.
// 为了简化教学，我们手动定义了这些类型。
// However, these types are generated automatically if you're using an ORM such as Prisma.
// 然而，如果您使用的是 ORM（如 Prisma），这些类型会自动生成。

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // 在Ts中，这叫做字符串联合类型。
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  // 这意味着"status"属性只能是"pending"或"paid"中的一个字符串。
  status: 'pending' | 'paid';
};

// 原始收入数据类型
export type Revenue = {
  month: string;
  revenue: number;
};
// 最新的发票数据类型
export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
// 数据库返回一个数字，但我们稍后使用 formatCurrency 函数将其格式化为字符串。
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

// 发票表格数据类型
export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};
// 客户表格数据类型
export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};
// 格式化客户表格数据类型
export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
