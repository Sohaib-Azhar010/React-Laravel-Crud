<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PostController extends Controller
{
    use AuthorizesRequests;
    // Display all posts
    public function index()
    {
        $posts = Post::with('user')->latest()->get();

        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    // Store a new post
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]);

    $request->user()->posts()->create([
        'title' => $request->title,
        'content' => $request->content,
    ]);

    return redirect('/posts')->with('success', 'Post created successfully!');
}


    // Show single post (optional)
    public function show($id)
    {
        $post = Post::with('user')->findOrFail($id);
        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    // Show edit form
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }

    // Update an existing post
   public function update(Request $request, Post $post)
{
    $this->authorize('update', $post); // 🔒 This checks the policy

    $post->update($request->only('title', 'content'));

    return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
}


    // Delete a post
    public function destroy(Post $post)
    {
        $this->authorize('delete', $post); // Optional

        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted.');
    }
}
