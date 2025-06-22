import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PageProps {
  post: Post;
}

const Edit = ({ post }: PageProps) => {
  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Posts', href: '/posts' },
    { title: 'Edit', href: `/posts/${post.id}/edit` },
  ];

  const { data, setData, put, processing, errors } = useForm({
    title: post.title || '',
    content: post.content || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/posts/${post.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Post" />

      <div className="w-full max-w-6xl mx-auto px-4 mt-10">
        <div className="rounded-xl shadow-lg overflow-hidden bg-white border border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-4">
            <h2 className="text-white text-xl font-semibold">Edit Post</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block font-medium text-gray-800 dark:text-gray-200">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className={`mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:bg-gray-900 dark:text-white ${
                  errors.title ? 'border-red-500' : ''
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="content" className="block font-medium text-gray-800 dark:text-gray-200">
                Content
              </label>
              <textarea
                id="content"
                rows={6}
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                className={`mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:bg-gray-900 dark:text-white ${
                  errors.content ? 'border-red-500' : ''
                }`}
              ></textarea>
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition disabled:opacity-60"
              >
                {processing ? 'Updating...' : 'Update'}
              </button>

              <Link
                href="/posts"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-yellow-600 transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Edit;
