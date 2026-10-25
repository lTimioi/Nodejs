'use client';
// 搜索组件
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// 加上反弹机制，避免频繁触发搜索（当用户输入完在开始记录）
import { useDebouncedCallback } from 'use-debounce';
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 添加监听函数，当监听到用户输入时，可以进行监听 并进行条件触发
  // function handleSearch(term: string) {
  // 反弹机制注入  
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    // 用搜索函数 跟新URL  URLSearchParams 是一个提供工具方法以操作URL查询参数的Web API。
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    // 对于搜索项的判断  如果搜索项存在，就设置查询参数为搜索项，否则删除查询参数
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
     <input
      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      placeholder={placeholder}

      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
