import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Post {
    id: number;
    title: string;
    content: string;
    user: {
        name: string;
    };
}

interface PageProps {
    posts: Post[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Index({ posts }: PageProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/posts/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />

            <div className="flex justify-between items-center mb-6 px-4">
                <h1 className="text-2xl font-bold">All Posts</h1>
                <Link
                    href="/posts/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    + Create Post
                </Link>
            </div>

            <div className="px-4 overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 rounded-lg shadow-sm bg-white">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left border-b">ID</th>
                            <th className="px-4 py-2 text-left border-b">Title</th>
                            <th className="px-4 py-2 text-left border-b">Content</th>
                            <th className="px-4 py-2 text-left border-b">Author</th>
                            <th className="px-4 py-2 text-left border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                                    No posts available.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{post.id}</td>
                                    <td className="px-4 py-2 border-b">{post.title}</td>
                                    <td className="px-4 py-2 border-b">{post.content}</td>
                                    <td className="px-4 py-2 border-b">{post.user?.name || 'Unknown'}</td>
                                    <td className="px-4 py-2 border-b space-x-2">
                                        <Link
                                            href={`/posts/${post.id}/edit`}
                                            className="inline-block px-3 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="inline-block px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
