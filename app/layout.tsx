import { inter } from '@/app/ui/fonts';

// 导入全局CSS样式文件，使用路径别名指向 app/ui/global.css
import '@/app/ui/global.css';
// 全局布局组件，作为所有页面的根布局
export default function RootLayout({
  // children 参数，用于接收嵌套的子组件
  children,
}: {
  // 定义 children 参数的类型为 React.ReactNode（React 中可渲染的任何内容）
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* body 元素，将子组件 children 渲染到页面主体中 */}
      <body className={`${inter.className} antialiased`}> 
        {children}
        {/* 在Tailwind 中可以直接添加类名来进行样式设计*/}
         <h1 className="text-blue-500">I'm blue!</h1>
      </body>
    </html>
  );
}
