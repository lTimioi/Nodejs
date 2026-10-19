// 导航链接组件
'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
// 导入连接组件 类似于a 标签
import Link from 'next/link';
// 导入路由实例
import { usePathname } from 'next/navigation';
// className 合并工具函数
import clsx from 'clsx';
// 导航链接组件
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

// 定义跳转连接映射，用于在侧边栏中显示导航链接
// link  链路组件 
// icon  链路图标
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          // 将a 标签替换为 Link 组件 
          <Link
            key={link.name}
            href={link.href}
            // className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
             className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                // 当点击当前链接时，改变颜色为背景色
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
