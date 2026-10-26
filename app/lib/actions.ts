'use server';
// 重定向
import { redirect } from 'next/navigation';
// 刷新缓存
import { revalidatePath } from 'next/cache';
// 连接数据库
import postgres from 'postgres';
// 导入 zod 库，用于类型验证和强制更改
import {z} from 'zod';
// 实例化数据库连接
const sql=postgres(process.env.POSTGRES_URL!);
// 进行强制的类型验证，同时进行强制更改
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
const UpdateInvoice=FormSchema.omit({id:true,date:true});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
// 创建发票
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

//   对存储的数据进行处理
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  // 插入发票数据到数据库
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `
//   同时还有跳转作用 
  // 清除缓存 然后刷新 并触发对服务器的新请求
  revalidatePath('/dashboard/invoices');
  // 重定向到发票列表页面
  redirect('/dashboard/invoices');
}
// 更新发票
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
// 删除发票
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}