import { FC } from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  productName: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ productName }) => {
  return (
    <nav className="flex my-4 translate-y-6" aria-label="Breadcrumb">
      <ol className="flex items-center whitespace-nowrap">
        <li className="inline-flex items-center">
          <Link href="/" className="flex items-center text-sm font-semibold text-gray-800 hover:text-secondary focus:outline-none focus:text-secondary dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
            Home
          </Link>
          <svg className="shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
          </svg>
        </li>
        <li className="inline-flex items-center">
          <Link href="/products" className="flex items-center text-sm font-semibold text-gray-800 hover:text-secondary focus:outline-none focus:text-secondary dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
            Products
          </Link>
          <svg className="shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
          </svg>
        </li>
        <li className="inline-flex items-center text-sm  truncate dark:text-neutral-200" aria-current="page">
          {productName}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;